import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

// Modules
import { AuthModule } from './modules/auth';
import { UserEntity, UserModule } from './modules/user';
import { TweetEntity, TweetModule } from './modules/tweet';
import { AuthMiddleware } from './modules/auth/middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.MYSQL_HOST}`,
      port: +`${process.env.MYSQL_PORT}`,
      username: `${process.env.MYSQL_USERNAME}`,
      password: `${process.env.MYSQL_PASSWORD}`,
      database: `${process.env.MYSQL_DATABASE}`,
      entities: [UserEntity, TweetEntity],
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
    AuthModule,
    UserModule,
    TweetModule,
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
