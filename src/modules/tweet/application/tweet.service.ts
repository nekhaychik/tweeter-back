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
    files,
    userId,
  }: CreateTweetParameters): Promise<TweetDto> {
    try {
      if (!text && files.length === 0) {
        throw new BadRequestException('Record cannot be empty.');
      }

      const imagesURLs = [];

      if (files) {
        files.forEach((file: Express.Multer.File) => {
          imagesURLs.push(file.path);
        });
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

      let parentRecordId: string;
      let parentRecordAuthorId: string;

      if (tweet.parentRecordAuthorId) {
        parentRecordId = tweet.parentRecordId;
        parentRecordAuthorId = tweet.parentRecordAuthorId;
      } else {
        parentRecordId = tweet._id;
        parentRecordAuthorId = tweet.authorId;
      }

      const { isComment, text, imagesURLs: imagesURLsJSON } = tweet;

      let imagesURLs = [];

      if (typeof imagesURLsJSON === 'string')
        imagesURLs = JSON.parse(imagesURLsJSON);
      else imagesURLs = imagesURLsJSON;

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

  public async updateTweetWithoutImages({
    userId,
    tweetId,
    text,
    isComment,
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

      if (isComment === tweet.isComment && text === tweet.text) {
        throw new BadRequestException(
          'You cannot eidt it. There are not changes',
        );
      }

      return await this.tweetDomain.updateTweet({
        tweetId,
        isComment,
        text,
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
