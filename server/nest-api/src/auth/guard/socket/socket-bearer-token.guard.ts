import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class SocketBearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient();
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      throw new WsException('쿠키가 없습니다.');
    }

    try {
      // 쿠키 문자열을 파싱하여 객체로 변환
      const cookieObj = this.parseCookies(cookies);
      const mockRequest = { cookies: cookieObj };
      
      const token = this.authService.extractTokenFromCookies(mockRequest, 'access');
      const payload = this.authService.verifyToken(token);
      const user = await this.userService.getUserByEmail(payload.email);

      socket.user = user;
      socket.token = token;
      socket.tokenType = payload.type;

      return true;
    } catch (err) {
      throw new WsException('토큰이 유효하지 않습니다.');
    }
  }

  private parseCookies(cookieString: string): Record<string, string> {
    const cookies = {};
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
    return cookies;
  }
}
