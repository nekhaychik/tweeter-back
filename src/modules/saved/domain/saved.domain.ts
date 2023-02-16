import { Injectable } from '@nestjs/common';

// Interfaces
import { SavedEntity } from '../infrastructure/entities';
import {
  CountTweetSavedParameters,
  CreateSavedParameters,
  DeleteSavedParameters,
  GetAllSavedByUserIdParameters,
  GetSavedParameters,
  GetTweetSavedUsersParameters,
} from './saved-domain.type';

// Repositories
import { SavedRepository } from '../infrastructure/repositories';

@Injectable()
export class SavedDomain {
  constructor(private savedRepository: SavedRepository) {}

  public async createSaved({
    userId,
    tweetId,
  }: CreateSavedParameters): Promise<SavedEntity> {
    return await this.savedRepository.create({ userId, tweetId });
  }

  public async getSaved({
    tweetId,
    userId,
  }: GetSavedParameters): Promise<SavedEntity> {
    return await this.savedRepository.getSaved({ tweetId, userId });
  }

  public async getAllSavedByUserId({
    userId,
  }: GetAllSavedByUserIdParameters): Promise<SavedEntity[]> {
    return await this.savedRepository.getAllSavedByUserId({ userId });
  }

  public async countTweetSaved({
    tweetId,
  }: CountTweetSavedParameters): Promise<number> {
    return await this.savedRepository.countTweetSaved({ tweetId });
  }

  public async getTweetSavedUsers({
    tweetId,
  }: GetTweetSavedUsersParameters): Promise<string[]> {
    return await this.savedRepository.getTweetSavedUsers({ tweetId });
  }

  public async deleteSaved({
    tweetId,
    userId,
  }: DeleteSavedParameters): Promise<void> {
    await this.savedRepository.delete({ tweetId, userId });
  }
}
