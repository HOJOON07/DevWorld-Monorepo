import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { AuthService } from './auth.service';
import { GithubCodeDto } from './dto/register-github.dto';
import { RegisterGithubUserDto, RegisterUserDto } from './dto/register-user.dto';
import { BasciTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { OAuthService } from './oauth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, false);

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, true);

    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasciTokenGuard)
  async postLoginEmail(@Headers('authorization') rawToken: string, @Request() req) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodeBasicToken(token);

    return await this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  @IsPublic()
  postRegisterEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }

  @Post('/github')
  @IsPublic()
  postRegisterGithub(@Body() body: RegisterGithubUserDto) {
    return this.authService.loginWithGithubOAuth(body);
  }

  @Post('/callback/github')
  @IsPublic()
  async postOauthGithubLogin(@Body() githubCode: GithubCodeDto) {
    const userInfo = await this.authService.OAuthGithubLogin(githubCode);
    return {
      status: 200,
      message: '깃허브 유저 정보를 조회했습니다',
      userInfo,
    };
  }

  @Get('/callback/:provider')
  @IsPublic()
  async getOAuthCallbackUrl(@Param('provider') provider: 'google' | 'github') {
    // // const callbackUrl = await this.authService.
    // return callbackUrl
    return { provider };
  }
}
