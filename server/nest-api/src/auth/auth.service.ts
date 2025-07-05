import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosResponse } from 'axios';
import * as bcrypt from 'bcrypt';
import handleAxiosError from 'src/common/axios-error/handle-error';
import { UserModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import {
  ENV_GITHUB_CLIENT_ID,
  ENV_GITHUB_CLIENT_SECRET,
  ENV_JWT_HASH_ROUNDS,
  ENV_JWT_SECRET,
} from './../common/const/env-keys.const';
import { JWT_Expires_Time } from './const/auth.const';
import { OAuthUserInfoDto } from './dto/oauth.dto';
import { GithubBasicInfoUserDto, GithubCodeDto } from './dto/register-github.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const token = splitToken[1];

    return token;
  }

  decodeBasicToken(base64string: string) {
    const decoded = Buffer.from(base64string, 'base64').toString('utf-8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const email = split[0];
    const password = split[1];

    return {
      email,
      password,
    };
  }
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET),
      });
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료됐거나 잘못된 토큰입니다.', e);
    }
  }
  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_JWT_SECRET),
    });

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException('토큰 재발급은 Refresh 토큰으로만 가능합니다.!');
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  signToken(user: Pick<UserModel, 'id' | 'devName' | 'email'>, isRefreshToken: boolean) {
    const payload = {
      sub: user.id,
      devName: user.devName,
      email: user.email,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET),
      expiresIn: isRefreshToken ? JWT_Expires_Time.refresh : JWT_Expires_Time.access,
    });
  }

  loginUser(user: Pick<UserModel, 'id' | 'devName' | 'email'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  async authenticateWithEmailForOAuth(userInfo: OAuthUserInfoDto) {
    const existingUser = await this.userService.getUserByEmail(userInfo.email);

    if (!existingUser) {
      const newUser = await this.userService.createOAuthUser(userInfo);
      return newUser;
    }

    return existingUser;
  }

  async authenticateWithEmailAndPassword(user: Pick<UserModel, 'email' | 'password'>) {
    const existingUser = await this.userService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const passwordOK = await bcrypt.compare(user.password, existingUser.password);

    if (!passwordOK) {
      throw new UnauthorizedException('입력하신 사용자 정보를 찾을 수 없습니다.');
    }

    return existingUser;
  }

  async loginWithEmail(user: Pick<UserModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginUser(existingUser);
  }
  async loginWithOAuth(userInfo: OAuthUserInfoDto) {
    const existingUser = await this.authenticateWithEmailForOAuth(userInfo);
    return this.loginUser(existingUser);
  }

  async registerWithEmail(user: RegisterUserDto) {
    const hash_rounds = parseInt(this.configService.get<string>(ENV_JWT_HASH_ROUNDS));
    const hashPassword = await bcrypt.hash(user.password, hash_rounds);
    const hashConfirmPassword = await bcrypt.hash(user.passwordConfirm, hash_rounds);

    const confirmPass = await bcrypt.compare(user.passwordConfirm, hashPassword);

    const confirmPass2 = await bcrypt.compare(user.password, hashConfirmPassword);

    if (!confirmPass && !confirmPass2) {
      throw new BadRequestException(
        '사용자가 입력한 비밀번호와 확인 비밀번호가 일치하지 않습니다.',
      );
    }

    const newUser = await this.userService.createUser(user.email, hashPassword, user.devName);

    return this.loginUser(newUser);
  }

  async getGithubAccessToken(githubCode: string) {
    const getTokenUrl: string = 'https://github.com/login/oauth/access_token';
    const request = {
      code: githubCode,
      client_id: this.configService.get<string>(ENV_GITHUB_CLIENT_ID),
      client_secret: this.configService.get<string>(ENV_GITHUB_CLIENT_SECRET),
    };
    try {
      const response: AxiosResponse = await axios.post(getTokenUrl, request, {
        headers: {
          accept: 'application/json',
        },
      });
      if (response.data.error) {
        throw new UnauthorizedException('깃허브 인증을 실패했습니다.');
      }
      if (!response.data.access_token) {
        throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
      }

      return response.data.access_token;
    } catch (error) {
      console.error('GitHub Access Token을 받아오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }

  async getGithubBasicInfo(githubCode: string) {
    try {
      const access_token = await this.getGithubAccessToken(githubCode);

      const getBasicInfoUserUrl: string = 'https://api.github.com/user';
      const response = await axios.get(getBasicInfoUserUrl, {
        headers: {
          authorization: `token ${access_token}`,
        },
      });

      const { login, html_url, location, bio, company, blog } = response.data;
      const basicGithubUserInfo: GithubBasicInfoUserDto = {
        devName: login,
        github: html_url,
        location,
        bio,
        company,
        socialEtc: blog,
      };

      return { ...basicGithubUserInfo, access_token };
    } catch (error) {
      console.error('GitHub 기본 정보를 가져오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }
  async getGithubUserEmail(access_token: string) {
    const getUserEmailUrl = 'https://api.github.com/user/emails';
    try {
      const response = await axios.get(getUserEmailUrl, {
        headers: {
          authorization: `token ${access_token}`,
        },
      });
      const email = response.data
        .filter((email) => email.primary && email.verified)
        .map((data) => data.email); // 수정: 이메일 객체에서 이메일 주소만 추출
      return email[0];
    } catch (error) {
      console.error('GitHub 이메일 정보를 가져오는데 실패했습니다.', error);
      handleAxiosError(error);
    }
  }

  async OAuthGithubLogin(githubcode: GithubCodeDto) {
    try {
      const { code } = githubcode;
      const { devName, github, location, bio, company, socialEtc, access_token } =
        await this.getGithubBasicInfo(code);
      const email = await this.getGithubUserEmail(access_token);

      return {
        devName,
        github,
        location,
        bio,
        company,
        socialEtc,
        email,
      };
    } catch (error) {
      console.error('GitHub OAuth 로그인 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }
}
