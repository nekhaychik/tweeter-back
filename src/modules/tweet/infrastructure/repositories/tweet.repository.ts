import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Tweet } from '../../core';
import { TweetEntity } from '../entities/tweet.entity';
import {
  createParameters,
  DeleteParameters,
  GetAllByAuthorIdParameters,
  GetByRecordIdParameters,
  UpdateParameters,
} from '../repository-interfaces';

@Injectable()
export class TweetRepository {
  constructor(
    @InjectRepository(TweetEntity)
    private tweetRepository: Repository<TweetEntity>,
  ) {}

  public async create({
    isComment,
    text,
    imagesURLs,
    authorId,
    parentRecordAuthorId,
    parentRecordId,
  }: createParameters): Promise<Tweet> {
    return await this.tweetRepository.save({
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      isComment,
      text,
      imagesURLs: JSON.stringify(imagesURLs),
      authorId,
      parentRecordAuthorId,
      parentRecordId,
    });
  }

  public async getByRecordId({ _id }: GetByRecordIdParameters): Promise<Tweet> {
    return await this.tweetRepository.findOneBy({ _id });
  }

  public async getAllByAuthorId({
    authorId,
  }: GetAllByAuthorIdParameters): Promise<Tweet[]> {
    return await this.tweetRepository.findBy({ authorId });
  }

  public async update({
    _id,
    isComment,
    text,
    imagesURLs,
  }: UpdateParameters): Promise<UpdateResult> {
    return await this.tweetRepository.update(
      { _id },
      {
        updatedAt: new Date().toUTCString(),
        isComment,
        text,
        imagesURLs: JSON.stringify(imagesURLs),
      },
    );
  }

  public async delete({ _id }: DeleteParameters): Promise<DeleteResult> {
    return await this.tweetRepository.delete({ _id });
  }
}
