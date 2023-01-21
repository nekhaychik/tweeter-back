import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

// Repositories
import { TweetRepository } from '../infrastructure';

// Interfaces
import { Tweet } from '../core';
import {
  CreateTweetParameters,
  DeleteTweetParameters,
  GetAllUserRecordsParameters,
  GetTweetByRecordIdParameters,
  UpdateTweetParameters,
} from './tweet-domain.type';

@Injectable()
export class TweetDomain {
  constructor(private readonly tweetRepository: TweetRepository) {}

  public async createTweet({
    isComment,
    text,
    imagesURLs,
    authorId,
    parentRecordAuthorId,
    parentRecordId,
  }: CreateTweetParameters): Promise<Tweet> {
    return await this.tweetRepository.create({
      isComment,
      text,
      imagesURLs,
      authorId,
      parentRecordAuthorId,
      parentRecordId,
    });
  }

  public async getTweetByTweetId({
    tweetId,
  }: GetTweetByRecordIdParameters): Promise<Tweet> {
    return this.tweetRepository.getByRecordId({ _id: tweetId });
  }

  public async GetAllUserRecords({
    authorId,
  }: GetAllUserRecordsParameters): Promise<Tweet[]> {
    return await this.tweetRepository.getAllByAuthorId({ authorId });
  }

  public async updateTweet({
    tweetId,
    isComment,
    text,
    imagesURLs,
  }: UpdateTweetParameters): Promise<UpdateResult> {
    return await this.tweetRepository.update({
      _id: tweetId,
      isComment,
      text,
      imagesURLs,
    });
  }

  public async deleteTweet({
    tweetId,
  }: DeleteTweetParameters): Promise<DeleteResult> {
    return this.tweetRepository.delete({ _id: tweetId });
  }
}
