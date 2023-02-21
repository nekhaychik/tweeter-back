import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './modules/auth';
import { UserEntity, UserModule } from './modules/user';
import { TweetEntity, TweetModule } from './modules/tweet';
import { RefreshSessionModule } from './modules/refresh-session';
import { SubscriptionEntity, SubscriptionModule } from './modules/subscription';
import { LikeEntity, LikeModule } from './modules/like';
import { RepostEntity, RepostModule } from './modules/repost';
import { SavedEntity, SavedModule } from './modules/saved';
import { CommentEntity, CommentModule } from './modules/comment';

// Middlewares
import { AuthMiddleware } from './modules/auth/middlewares';

// Services
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.MYSQL_HOST}`,
      port: +`${process.env.MYSQL_PORT}`,
      username: `${process.env.MYSQL_USERNAME}`,
      password: `${process.env.MYSQL_PASSWORD}`,
      database: `${process.env.MYSQL_DATABASE}`,
      entities: [
        UserEntity,
        TweetEntity,
        SubscriptionEntity,
        LikeEntity,
        RepostEntity,
        SavedEntity,
        CommentEntity,
      ],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: `${process.env.MAILER_TRANSPORT_HOST}`,
        auth: {
          user: `${process.env.MAILER_USER}`,
          pass: `${process.env.MAILER_API_KEY}`,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images/tweets'),
    }),
    AuthModule,
    UserModule,
    TweetModule,
    RefreshSessionModule,
    SubscriptionModule,
    LikeModule,
    RepostModule,
    SavedModule,
    CommentModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
