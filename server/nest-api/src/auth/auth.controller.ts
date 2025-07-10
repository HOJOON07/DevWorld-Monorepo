import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { DuplicateDevNameDto } from 'src/users/dto/duplicate-devname.dto';
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
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Request() req, @Res() res: Response) {
    const token = req.token;
    const newToken = this.authService.rotateToken(token, false);

    // 쿠키 설정을 서비스로 위임
    this.authService.setAccessTokenCookie(res, newToken);

    res.json({
      message: 'Access token renewed successfully',
    });
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Request() req, @Res() res: Response) {
    const token = req.token;
    const newToken = this.authService.rotateToken(token, true);

    // 쿠키 설정을 서비스로 위임
    this.authService.setRefreshTokenCookie(res, newToken);

    res.json({
      message: 'Refresh token renewed successfully',
    });
  }

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasciTokenGuard)
  async postLoginEmail(
    @Headers('authorization') rawToken: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodeBasicToken(token);

    const tokens = await this.authService.loginWithEmail(credentials);

    // 쿠키 설정을 서비스로 위임
    this.authService.setTokenCookies(res, tokens);

    res.send({
      message: 'Login successful',
    });
  }

  @Post('check/devname')
  @IsPublic()
  postDuplicateDevName(@Body() duplicateDevNameDto: DuplicateDevNameDto) {
    return this.authService.checkDuplicatedDevName(duplicateDevNameDto);
  }

  @Post('register/email')
  @IsPublic()
  async postRegisterEmail(@Body() body: RegisterUserDto, @Res() res: Response) {
    const tokens = await this.authService.registerWithEmail(body);
    this.authService.setTokenCookies(res, tokens);

    res.json({
      message: 'Registration successful',
    });
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
    @Res() res: Response,
  ) {
    const { code } = body;
    const userInfo = await this.oauthService.processOAuthLogin(provider, code);

    const tokens = await this.authService.loginWithOAuth(userInfo);
    this.authService.setTokenCookies(res, tokens);

    res.json({
      status: 200,
      message: `${provider} OAuth Login Success`,
    });
  }
}
