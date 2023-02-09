import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Interfaces
import { RepostEntity } from '../entities/repost.entity';
import {
  CountTweetRepostsParameters,
  CreateParameters,
  DeleteParameters,
  GetRepostParameters,
  GetTweetRepostUsersParameters,
} from '../repository-interfaces';

@Injectable()
export class RepostRepository {
  constructor(
    @InjectRepository(RepostEntity)
    private repostRepository: Repository<RepostEntity>,
  ) {}

  public async create({
    userId,
    tweetId,
  }: CreateParameters): Promise<RepostEntity> {
    return await this.repostRepository.save({
      userId,
      tweetId,
      createdAt: new Date(),
    });
  }

  public async getRepost({
    tweetId,
    userId,
  }: GetRepostParameters): Promise<RepostEntity> {
    return await this.repostRepository.findOneBy({ tweetId, userId });
  }

  public async countTweetReposts({
    tweetId,
  }: CountTweetRepostsParameters): Promise<number> {
    return await this.repostRepository.count({ where: { tweetId } });
  }

  public async getTweetRepostUsers({
    tweetId,
  }: GetTweetRepostUsersParameters): Promise<string[]> {
    return (await this.repostRepository.find({ where: { tweetId } })).map(
      (like) => like.userId,
    );
  }

  public async delete({ tweetId, userId }: DeleteParameters): Promise<void> {
    await this.repostRepository.delete({ userId, tweetId });
  }
}
