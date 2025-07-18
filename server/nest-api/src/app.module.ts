import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './articles/comments/comments.module';
import { CommentsModel } from './articles/comments/entities/comment.entity';
import { ArticlesModel } from './articles/entities/articles.entity';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guard/bearer-token.guard';
import { AwsS3UploadModule } from './aws_s3_upload/aws_s3_upload.module';
import { CommonModule } from './common/common.module';
import {
  ENV_DB_DATABASE,
  ENV_DB_HOST,
  ENV_DB_PASSWORD,
  ENV_DB_PORT,
  ENV_DB_USERNAME,
} from './common/const/env-keys.const';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
import { ImageModel } from './common/entities/image.entity';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthMailModel } from './mail/entities/auth-email';
import { MailModule } from './mail/mail.module';
import { UserFollowersModel } from './users/entities/user-followers.entity';
import { UserModel } from './users/entities/users.entity';
import { RolesGuard } from './users/guard/roles.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST],
      port: parseInt(process.env[ENV_DB_PORT]),
      username: process.env[ENV_DB_USERNAME],
      password: process.env[ENV_DB_PASSWORD],
      database: process.env[ENV_DB_DATABASE],
      entities: [
        ArticlesModel,
        UserModel,
        AuthMailModel,
        ImageModel,
        CommentsModel,
        UserFollowersModel,
      ],
      synchronize: true,
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
    CommonModule,
    MailModule,
    CommentsModule,
    AwsS3UploadModule,
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ClassSerializerInterceptor 비활성화 - UserModel 순환 참조 문제
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LogMiddleWare).forRoutes({
//       path: '*',
//       method: RequestMethod.ALL,
//     });
//   }
// }
