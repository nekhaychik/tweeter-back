import { BadRequestException, Injectable } from '@nestjs/common';

// Interfaces
import { Status, UserDto } from 'src/core';
import { TweetDto } from 'src/modules/tweet/core';
import { SavedEntity } from '../infrastructure';
import {
  CreateSavedParameters,
  DeleteSavedParameters,
  GetAllSavedByUserIdParameters,
  GetAmountOfTweetSavedParameters,
  GetUsersSavedTweetParameters,
} from './saved-service.type';

// Domains
import { TweetDomain } from 'src/modules/tweet/domain';
import { UserDomain } from 'src/modules/user';
import { SavedDomain } from '../domain';

@Injectable()
export class SavedService {
  constructor(
    private readonly savedDomain: SavedDomain,
    private readonly userDomain: UserDomain,
    private readonly tweetDomain: TweetDomain,
  ) {}

  public async createSaved({
    tweetId,
    userId,
  }: CreateSavedParameters): Promise<SavedEntity> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const saved: SavedEntity = await this.savedDomain.getSaved({
        tweetId,
        userId,
      });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      if (saved) {
        throw new BadRequestException('You already saved this tweet');
      }

      return await this.savedDomain.createSaved({ tweetId, userId });
    } catch (err) {
      throw err;
    }
  }

  public async getAmountOfTweetSaved({
    tweetId,
  }: GetAmountOfTweetSavedParameters): Promise<number> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return await this.savedDomain.countTweetSaved({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async getUsersSavedTweet({
    tweetId,
  }: GetUsersSavedTweetParameters): Promise<string[]> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return await this.savedDomain.getTweetSavedUsers({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async getAllSavedByUserId({
    userId,
  }: GetAllSavedByUserIdParameters): Promise<SavedEntity[]> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      return await this.savedDomain.getAllSavedByUserId({ userId });
    } catch (err) {
      throw err;
    }
  }

  public async deleteSaved({
    tweetId,
    userId,
  }: DeleteSavedParameters): Promise<{ status: Status }> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const saved: SavedEntity = await this.savedDomain.getSaved({
        tweetId,
        userId,
      });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      if (!saved) {
        throw new BadRequestException(
          'You cannot unsave this tweet because you did not save it before',
        );
      }

      await this.savedDomain.deleteSaved({ tweetId, userId });

      return { status: Status.success };
    } catch (err) {
      throw err;
    }
  }
}
