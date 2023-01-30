import { BadRequestException, Injectable } from '@nestjs/common';

// Domains
import { TweetDomain } from '../domain';

// Interfaces
import { DeleteResult } from 'typeorm';
import { TweetDto } from '../core';
import {
  CreateTweetParameters,
  DeleteTweetParameters,
  GetAllUserTweetsParameters,
  GetTweetByIdParameters,
  RepostTweetParameters,
  UpdateTweetParameters,
} from './tweet-service.type';
import { Status } from 'src/core';

@Injectable()
export class TweetService {
  constructor(private readonly tweetDomain: TweetDomain) {}

  public async createTweet({
    isComment,
    text,
    imagesURLs,
    userId,
  }: CreateTweetParameters): Promise<TweetDto> {
    try {
      if (!text && imagesURLs.length === 0) {
        throw new BadRequestException('Record cannot be empty.');
      }

      return await this.tweetDomain.createTweet({
        isComment,
        text,
        imagesURLs,
        authorId: userId,
      });
    } catch (err) {
      throw err;
    }
  }

  public async repostTweet({
    tweetId,
    userId,
  }: RepostTweetParameters): Promise<TweetDto> {
    try {
      const tweet = await this.tweetDomain.getTweetByTweetId({ tweetId });

      if (!tweet) {
        throw new BadRequestException('Tweet does not exist.');
      }

      const {
        isComment,
        text,
        imagesURLs: imagesURLsJSON,
        _id: parentRecordId,
        authorId: parentRecordAuthorId,
      } = tweet;

      const imagesURLs = JSON.parse(imagesURLsJSON);

      return await this.tweetDomain.createTweet({
        isComment,
        text,
        imagesURLs,
        authorId: userId,
        parentRecordAuthorId,
        parentRecordId,
      });
    } catch (err) {
      throw err;
    }
  }

  public async getTweetById({
    tweetId,
  }: GetTweetByIdParameters): Promise<TweetDto> {
    try {
      const tweet = await this.tweetDomain.getTweetByTweetId({ tweetId });

      if (!tweet) {
        throw new BadRequestException('Tweet does not exist');
      }

      return tweet;
    } catch (err) {
      throw err;
    }
  }

  public async getAllUserTweets({
    userId,
  }: GetAllUserTweetsParameters): Promise<TweetDto[]> {
    try {
      return await this.tweetDomain.GetAllUserRecords({ authorId: userId });
    } catch (err) {
      throw err;
    }
  }

  public async updateTweet({
    userId,
    tweetId,
  }: UpdateTweetParameters): Promise<TweetDto & { status: Status }> {
    try {
      const tweet = await this.tweetDomain.getTweetByTweetId({ tweetId });

      if (!tweet) {
        throw new BadRequestException('Tweet does not exist.');
      }

      if (tweet.authorId !== userId) {
        throw new BadRequestException(
          'This is not your tweet. You cannot edit it.',
        );
      }

      if (tweet.parentRecordAuthorId) {
        throw new BadRequestException(
          'This tweet was reposted. You cannot edit it.',
        );
      }

      const { isComment, text, imagesURLs: imagesURLsJSON } = tweet;

      const imagesURLs = JSON.parse(imagesURLsJSON);

      return await this.tweetDomain.updateTweet({
        tweetId,
        isComment,
        text,
        imagesURLs,
      });
    } catch (err) {
      throw err;
    }
  }

  public async deleteTweet({
    tweetId,
    userId,
  }: DeleteTweetParameters): Promise<DeleteResult> {
    try {
      const tweet = await this.tweetDomain.getTweetByTweetId({ tweetId });

      if (!tweet) {
        throw new BadRequestException('Tweet does not exist');
      }

      if (tweet.authorId !== userId) {
        throw new BadRequestException(
          'This is not your tweet. You cannot delete it.',
        );
      }

      return await this.tweetDomain.deleteTweet({ tweetId });
    } catch (err) {
      throw err;
    }
  }
}
