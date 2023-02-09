import { Injectable } from '@nestjs/common';

// Interfaces
import { LikeEntity } from '../infrastructure/entities';
import {
  CountTweetLikesParameters,
  CreateLikeParameters,
  DeleteLikeParameters,
  GetLikeParameters,
  GetTweetLikeUsersParameters,
} from './like-domain.type';

// Repositories
import { LikeRepository } from '../infrastructure/repositories';

@Injectable()
export class LikeDomain {
  constructor(private likeRepository: LikeRepository) {}

  public async createLike({
    userId,
    tweetId,
  }: CreateLikeParameters): Promise<LikeEntity> {
    return await this.likeRepository.create({ userId, tweetId });
  }

  public async getLike({
    tweetId,
    userId,
  }: GetLikeParameters): Promise<LikeEntity> {
    return await this.likeRepository.getLike({ tweetId, userId });
  }

  public async countTweetLikes({
    tweetId,
  }: CountTweetLikesParameters): Promise<number> {
    return await this.likeRepository.countTweetLikes({ tweetId });
  }

  public async getTweetLikeUsers({
    tweetId,
  }: GetTweetLikeUsersParameters): Promise<string[]> {
    return await this.likeRepository.getTweetLikeUsers({ tweetId });
  }

  public async deleteLike({
    tweetId,
    userId,
  }: DeleteLikeParameters): Promise<void> {
    await this.likeRepository.delete({ tweetId, userId });
  }
}
