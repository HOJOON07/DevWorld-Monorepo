import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { DuplicateDevNameDto } from 'src/users/dto/duplicate-devname.dto';
import { UserModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ENV_JWT_HASH_ROUNDS, ENV_JWT_SECRET } from './../common/const/env-keys.const';
import { JWT_Expires_Time } from './const/auth.const';
import { OAuthUserInfoDto } from './dto/oauth.dto';
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

  extractTokenFromCookies(request: any, tokenType: 'access' | 'refresh' = 'access'): string {
    const cookieName = tokenType === 'access' ? 'access_token' : 'refresh_token';

    if (!request.cookies || !request.cookies[cookieName]) {
      throw new UnauthorizedException(`쿠키에서 ${tokenType} 토큰을 찾을 수 없습니다.`);
    }

    return request.cookies[cookieName];
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

  loginUser(user: any) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  setTokenCookies(response: any, tokens: { accessToken: string; refreshToken: string }) {
    const cookieOptions = {
      httpOnly: false,
      secure: false,
      sameSite: 'lax' as const,
    };

    response.cookie('access_token', tokens.accessToken, {
      ...cookieOptions,
      // maxAge: 15 * 60 * 1000, // 15분
      maxAge: 5000, // 1초
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });
  }

  setAccessTokenCookie(response: any, accessToken: string) {
    response.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 15 * 60 * 1000, // 15분
    });
  }

  setRefreshTokenCookie(response: any, refreshToken: string) {
    response.cookie('refresh_token', refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });
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

  async checkDuplicatedDevName({ devName }: DuplicateDevNameDto) {
    const message = this.userService.checkDuplicatedDevName;
    return message;
  }

  validateAuthTokens(
    accessToken: string | undefined,
    refreshToken: string | undefined,
    response: any,
  ) {
    // Case 1: 둘 다 있는 정상적인 경우
    if (accessToken && refreshToken) {
      try {
        const accessPayload = this.verifyToken(accessToken);
        const refreshPayload = this.verifyToken(refreshToken);

        // 토큰 소유자 일치 확인
        if (accessPayload.sub !== refreshPayload.sub) {
          throw new UnauthorizedException('토큰 소유자가 일치하지 않습니다.');
        }

        return { message: '인증 성공 (Both Tokens Valid)' };
      } catch (accessError) {
        // access_token 만료, refresh_token 유효한 경우
        const refreshPayload = this.verifyToken(refreshToken);
        const newAccessToken = this.rotateToken(refreshToken, false);
        this.setAccessTokenCookie(response, newAccessToken);

        return { message: '인증 성공 (Token Refreshed)' };
      }
    }

    // Case 2: refresh_token만 있는 경우 (정상 - access_token 만료)
    if (!accessToken && refreshToken) {
      const refreshPayload = this.verifyToken(refreshToken);
      const newAccessToken = this.rotateToken(refreshToken, false);
      this.setAccessTokenCookie(response, newAccessToken);

      return { message: '인증 성공 (Access Token Generated)' };
    }

    // Case 3: access_token만 있는 경우 (비정상!)
    if (accessToken && !refreshToken) {
      response.clearCookie('access_token');
      throw new UnauthorizedException('Refresh token이 없습니다. 재로그인이 필요합니다.');
    }

    // Case 4: 둘 다 없는 경우
    throw new UnauthorizedException('인증 토큰이 없습니다.');
  }

  clearAuthCookies(response: Response) {
    response.clearCookie('access_token', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    response.clearCookie('refresh_token', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
  }
}
