import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserEntity } from './modules/user/infrastructure';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'tweeter-db',
      entities: [UserEntity],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
