import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ENV_MAIL_FROM,
  ENV_MAIL_HOST,
  ENV_MAIL_PASS,
  ENV_MAIL_PORT,
  ENV_MAIL_USER,
} from 'src/common/const/env-keys.const';
import { UsersModule } from 'src/users/users.module';
import { AuthMailModel } from './entities/auth-email';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthMailModel]),
    UsersModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(ENV_MAIL_HOST),
          port: parseInt(configService.get<string>(ENV_MAIL_PORT)),
          secure: false,
          auth: {
            user: configService.get<string>(ENV_MAIL_USER),
            pass: configService.get<string>(ENV_MAIL_PASS),
          },
        },
        defaults: {
          from: configService.get<string>(ENV_MAIL_FROM),
        },
      }),
    }),
  ],
  exports: [MailService],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
