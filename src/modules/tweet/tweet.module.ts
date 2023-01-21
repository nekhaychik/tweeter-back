import { Module } from '@nestjs/common';
import { TweetDomain } from './domain';
import { TweetEntity, TweetRepository } from './infrastructure';

@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [TweetEntity, TweetRepository, TweetDomain],
})
export class TweetModule {}
