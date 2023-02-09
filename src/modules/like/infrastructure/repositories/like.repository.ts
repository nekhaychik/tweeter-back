import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Interfaces
import { LikeEntity } from '../entities/like.entity';
import {
  CountTweetLikesParameters,
  CreateParameters,
  DeleteParameters,
  GetLikeParameters,
  GetTweetLikeUsersParameters,
} from '../repository-interfaces';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}

  public async create({
    userId,
    tweetId,
  }: CreateParameters): Promise<LikeEntity> {
    return await this.likeRepository.save({
      userId,
      tweetId,
      createdAt: new Date(),
    });
  }

  public async getLike({
    tweetId,
    userId,
  }: GetLikeParameters): Promise<LikeEntity> {
    return await this.likeRepository.findOneBy({ tweetId, userId });
  }

  public async countTweetLikes({
    tweetId,
  }: CountTweetLikesParameters): Promise<number> {
    return await this.likeRepository.count({ where: { tweetId } });
  }

  public async getTweetLikeUsers({
    tweetId,
  }: GetTweetLikeUsersParameters): Promise<string[]> {
    return (await this.likeRepository.find({ where: { tweetId } })).map(
      (like) => like.userId,
    );
  }

  public async delete({ tweetId, userId }: DeleteParameters): Promise<void> {
    await this.likeRepository.delete({ userId, tweetId });
  }
}
