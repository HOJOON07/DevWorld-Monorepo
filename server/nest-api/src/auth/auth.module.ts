import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  exports: [AuthService, OAuthService],
  controllers: [AuthController],
  providers: [AuthService, OAuthService],
})
export class AuthModule {}
