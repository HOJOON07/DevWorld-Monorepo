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

    if (isPublic) {
      request.isRoutePublic = true;
      return true;
    }

    const token = this.authService.extractTokenFromCookies(request, 'access');

    const result = await this.authService.verifyToken(token);

    const user = await this.usersService.getUserByEmail(result.email);

    request.user = user;
    request.token = token;
    request.tokenType = result.type;

    return true;
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
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    if (isPublic) {
      request.isRoutePublic = true;
      return true;
    }

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
