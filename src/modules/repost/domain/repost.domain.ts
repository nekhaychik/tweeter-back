import { Injectable } from '@nestjs/common';

// Interfaces
import { RepostEntity } from '../infrastructure/entities';
import {
  CountTweetRepostsParameters,
  CreateRepostParameters,
  DeleteRepostParameters,
  GetRepostParameters,
  GetTweetRepostUsersParameters,
} from './repost-domain.type';

// Repositories
import { RepostRepository } from '../infrastructure/repositories';

@Injectable()
export class RepostDomain {
  constructor(private repostRepository: RepostRepository) {}

  public async createRepost({
    userId,
    tweetId,
  }: CreateRepostParameters): Promise<RepostEntity> {
    return await this.repostRepository.create({ userId, tweetId });
  }

  public async getRepost({
    tweetId,
    userId,
  }: GetRepostParameters): Promise<RepostEntity> {
    return await this.repostRepository.getRepost({ tweetId, userId });
  }

  public async countTweetReposts({
    tweetId,
  }: CountTweetRepostsParameters): Promise<number> {
    return await this.repostRepository.countTweetReposts({ tweetId });
  }

  public async getTweetRepostUsers({
    tweetId,
  }: GetTweetRepostUsersParameters): Promise<string[]> {
    return await this.repostRepository.getTweetRepostUsers({ tweetId });
  }

  public async deleteRepost({
    tweetId,
    userId,
  }: DeleteRepostParameters): Promise<void> {
    await this.repostRepository.delete({ tweetId, userId });
  }
}
