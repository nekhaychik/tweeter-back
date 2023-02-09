import { BadRequestException, Injectable } from '@nestjs/common';

// Interfaces
import { Status, UserDto } from 'src/core';
import { TweetDto } from 'src/modules/tweet/core';
import { RepostEntity } from '../infrastructure';
import {
  CreateRepostParameters,
  DeleteRepostParameters,
  GetAmountOfTweetRepostsParameters,
  GetUsersRepostedTweetParameters,
} from './repost-service.type';

// Domains
import { TweetDomain } from 'src/modules/tweet/domain';
import { UserDomain } from 'src/modules/user';
import { RepostDomain } from '../domain';

@Injectable()
export class RepostService {
  constructor(
    private readonly repostDomain: RepostDomain,
    private readonly userDomain: UserDomain,
    private readonly tweetDomain: TweetDomain,
  ) {}

  public async createRepost({
    tweetId,
    userId,
  }: CreateRepostParameters): Promise<RepostEntity> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const repost: RepostEntity = await this.repostDomain.getRepost({
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

      if (repost) {
        throw new BadRequestException('You already reposted this tweet');
      }

      return await this.repostDomain.createRepost({ tweetId, userId });
    } catch (err) {
      throw err;
    }
  }

  public async getAmountOfTweetReposts({
    tweetId,
  }: GetAmountOfTweetRepostsParameters): Promise<number> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return await this.repostDomain.countTweetReposts({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async getUsersRepostedTweet({
    tweetId,
  }: GetUsersRepostedTweetParameters): Promise<string[]> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return await this.repostDomain.getTweetRepostUsers({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async deleteRepost({
    tweetId,
    userId,
  }: DeleteRepostParameters): Promise<{ status: Status }> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const repost: RepostEntity = await this.repostDomain.getRepost({
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

      if (!repost) {
        throw new BadRequestException(
          'You cannot unlike this tweet because you did not like it before',
        );
      }

      await this.repostDomain.deleteRepost({ tweetId, userId });

      return { status: Status.success };
    } catch (err) {
      throw err;
    }
  }
}
