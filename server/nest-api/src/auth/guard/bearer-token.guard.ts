import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorator/is-public.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (isPublic) {
      request.isRoutePublic = true;
      return true;
    }

    // 쿠키에서 토큰들 추출 (없어도 undefined로 처리)
    const accessToken = request.cookies?.access_token;
    const refreshToken = request.cookies?.refresh_token;

    try {
      // validateAuthTokens 로직을 사용하여 토큰 검증 및 자동 갱신
      this.authService.validateAuthTokens(accessToken, refreshToken, response);
      
      // 토큰 검증 후 현재 유효한 access token 가져오기 (재발급되었을 수도 있음)
      const currentAccessToken = request.cookies?.access_token || accessToken;
      
      // 토큰이 재발급된 경우 새로운 토큰을 사용
      let tokenToVerify = currentAccessToken;
      
      // 만약 응답에 새로운 쿠키가 설정되었다면, 그 토큰을 사용
      const setCookieHeader = response.getHeaders()['set-cookie'];
      if (setCookieHeader) {
        const newAccessTokenCookie = Array.isArray(setCookieHeader) 
          ? setCookieHeader.find(cookie => cookie.includes('access_token='))
          : setCookieHeader.includes('access_token=') ? setCookieHeader : null;
        
        if (newAccessTokenCookie) {
          const match = newAccessTokenCookie.match(/access_token=([^;]+)/);
          if (match) {
            tokenToVerify = match[1];
          }
        }
      }

      const result = this.authService.verifyToken(tokenToVerify);
      const user = await this.usersService.getUserByEmail(result.email);

      request.user = user;
      request.token = tokenToVerify;
      request.tokenType = result.type;

      return true;
    } catch (error) {
      // validateAuthTokens에서 발생한 에러를 그대로 전달
      throw error;
    }
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    if (request.isRoutePublic) {
      return true;
    }

    if (request.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    // private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    const request = context.switchToHttp().getRequest();

    const token = this.authService.extractTokenFromCookies(request, 'refresh');

    const result = await this.authService.verifyToken(token);
    const user = await this.usersService.getUserByEmail(result.email);

    request.user = user;
    request.token = token;
    request.tokenType = result.type;

    if (request.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }
    return true;
  }
}
