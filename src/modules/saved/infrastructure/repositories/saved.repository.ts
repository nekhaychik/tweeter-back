import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Interfaces
import { SavedEntity } from '../entities/saved.entity';
import {
  CountTweetSavedParameters,
  CreateParameters,
  DeleteParameters,
  GetAllSavedByUserIdParameters,
  GetSavedParameters,
  GetTweetSavedUsersParameters,
} from '../repository-interfaces';

@Injectable()
export class SavedRepository {
  constructor(
    @InjectRepository(SavedEntity)
    private savedRepository: Repository<SavedEntity>,
  ) {}

  public async create({
    userId,
    tweetId,
  }: CreateParameters): Promise<SavedEntity> {
    return await this.savedRepository.save({
      userId,
      tweetId,
      createdAt: new Date(),
    });
  }

  public async getSaved({
    tweetId,
    userId,
  }: GetSavedParameters): Promise<SavedEntity> {
    return await this.savedRepository.findOneBy({ tweetId, userId });
  }

  public async getAllSavedByUserId({
    userId,
  }: GetAllSavedByUserIdParameters): Promise<SavedEntity[]> {
    return await this.savedRepository.findBy({ userId });
  }

  public async countTweetSaved({
    tweetId,
  }: CountTweetSavedParameters): Promise<number> {
    return await this.savedRepository.count({ where: { tweetId } });
  }

  public async getTweetSavedUsers({
    tweetId,
  }: GetTweetSavedUsersParameters): Promise<string[]> {
    return (await this.savedRepository.find({ where: { tweetId } })).map(
      (like) => like.userId,
    );
  }

  public async delete({ tweetId, userId }: DeleteParameters): Promise<void> {
    await this.savedRepository.delete({ userId, tweetId });
  }
}
