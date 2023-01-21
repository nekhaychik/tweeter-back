import { Module } from '@nestjs/common';
import { TweetEntity, TweetRepository } from './infrastructure';

@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [TweetEntity, TweetRepository],
})
export class TweetModule {}
