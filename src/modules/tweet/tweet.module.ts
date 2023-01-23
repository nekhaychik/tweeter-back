import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { TweetService } from './application';

// Domains
import { TweetDomain } from './domain';

// Infrastructures
import { TweetEntity, TweetRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([TweetEntity])],
  exports: [TweetService],
  controllers: [],
  providers: [TweetEntity, TweetRepository, TweetDomain, TweetService],
})
export class TweetModule {}
