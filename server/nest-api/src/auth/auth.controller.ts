import { Body, Controller, Get, Headers, Param, Post, Request, UseGuards } from '@nestjs/common';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { BasciTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { OAuthService } from './oauth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
  ) {}

  @Get('health')
  @IsPublic()
  healthcheck() {
    const testMessage = 'hi!';
    return testMessage;
  }

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

  @Get('callback/:provider')
  @IsPublic()
  async getOAuthCallbackUrl(@Param('provider') provider: 'google' | 'github') {
    const redirectUrl = this.oauthService.generateOAuthRedirectUrl(provider);

    return {
      provider,
      redirectUrl,
    };
  }

  @Post('oauth-login/:provider')
  @IsPublic()
  async oauthLogin(
    @Param('provider') provider: 'google' | 'github',
    @Body() body: { code: string },
  ) {
    const { code } = body;

    const userInfo = await this.oauthService.processOAuthLogin(provider, code);

    const tokens = await this.authService.loginWithOAuth(userInfo);

    return {
      status: 200,
      message: `${provider} OAuth Login Sucess`,
      ...tokens,
    };
  }
}
