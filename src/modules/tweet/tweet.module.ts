import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { TweetService } from './application';

// Controllers
import { TweetController } from './controller';

// Domains
import { TweetDomain } from './domain';

// Infrastructures
import { TweetEntity, TweetRepository } from './infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([TweetEntity]),
    MulterModule.register({
      dest: './images/tweets',
    }),
  ],
  exports: [TweetService, TweetDomain],
  controllers: [TweetController],
  providers: [TweetEntity, TweetRepository, TweetDomain, TweetService],
})
export class TweetModule {}
