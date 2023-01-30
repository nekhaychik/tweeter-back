import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

// Repositories
import { TweetRepository } from '../infrastructure';

// Interfaces
import { TweetDto } from '../core';
import {
  CreateTweetParameters,
  DeleteTweetParameters,
  GetAllUserRecordsParameters,
  GetTweetByRecordIdParameters,
  UpdateTweetParameters,
} from './tweet-domain.type';
import { Status } from 'src/core';

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
  }: CreateTweetParameters): Promise<TweetDto> {
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
  }: GetTweetByRecordIdParameters): Promise<TweetDto> {
    return this.tweetRepository.getByRecordId({ _id: tweetId });
  }

  public async GetAllUserRecords({
    authorId,
  }: GetAllUserRecordsParameters): Promise<TweetDto[]> {
    return await this.tweetRepository.getAllByAuthorId({ authorId });
  }

  public async updateTweet({
    tweetId,
    isComment,
    text,
    imagesURLs,
  }: UpdateTweetParameters): Promise<TweetDto & { status: Status }> {
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
