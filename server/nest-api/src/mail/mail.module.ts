import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';
import { AuthMailModel } from './entities/auth-email';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthMailModel]),
    UsersModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'ghwns5909@gmail.com',
            pass: 'mczz hqco pemn bvoh',
          },
        },
        defaults: {
          from: 'DevWorld_NoReply@devworld.com',
        },
      }),
    }),
  ],
  exports: [MailService],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
