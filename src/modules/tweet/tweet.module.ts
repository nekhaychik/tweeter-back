import { Module } from '@nestjs/common';

// Services
import { TweetService } from './application';

// Domains
import { TweetDomain } from './domain';

// Infrastructures
import { TweetEntity, TweetRepository } from './infrastructure';

@Module({
  imports: [],
  exports: [TweetService],
  controllers: [],
  providers: [TweetEntity, TweetRepository, TweetDomain, TweetService],
})
export class TweetModule {}
