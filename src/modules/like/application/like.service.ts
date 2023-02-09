import { BadRequestException, Injectable } from '@nestjs/common';

// Interfaces
import { Status, UserDto } from 'src/core';
import { TweetDto } from 'src/modules/tweet/core';
import { LikeEntity } from '../infrastructure';
import {
  CreateLikeParameters,
  DeleteLikeParameters,
  GetAmountOfTweetLikesParameters,
  GetUsersLikedTweetParameters,
} from './like-service.type';

// Domains
import { TweetDomain } from 'src/modules/tweet/domain';
import { UserDomain } from 'src/modules/user';
import { LikeDomain } from '../domain';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeDomain: LikeDomain,
    private readonly userDomain: UserDomain,
    private readonly tweetDomain: TweetDomain,
  ) {}

  public async createLike({
    tweetId,
    userId,
  }: CreateLikeParameters): Promise<LikeEntity> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const like: LikeEntity = await this.likeDomain.getLike({
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

      if (like) {
        throw new BadRequestException('You already liked this tweet');
      }

      return await this.likeDomain.createLike({ tweetId, userId });
    } catch (err) {
      throw err;
    }
  }

  public async getAmountOfTweetLikes({
    tweetId,
  }: GetAmountOfTweetLikesParameters): Promise<number> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return this.likeDomain.countTweetLikes({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async getUsersLikedTweet({
    tweetId,
  }: GetUsersLikedTweetParameters): Promise<string[]> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      return await this.likeDomain.getTweetLikeUsers({ tweetId });
    } catch (err) {
      throw err;
    }
  }

  public async deleteLike({
    tweetId,
    userId,
  }: DeleteLikeParameters): Promise<{ status: Status }> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });
      const like: LikeEntity = await this.likeDomain.getLike({
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

      if (!like) {
        throw new BadRequestException(
          'You cannot unlike this tweet because you did not like it before',
        );
      }

      await this.likeDomain.deleteLike({ tweetId, userId });

      return { status: Status.success };
    } catch (err) {
      throw err;
    }
  }
}
