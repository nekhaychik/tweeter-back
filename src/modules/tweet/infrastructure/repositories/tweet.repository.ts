import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';

// Entities
import { TweetEntity } from '../entities';

// Interfaces
import { Status } from 'src/core';
import { TweetDto } from '../../core';
import {
  createParameters,
  DeleteParameters,
  GetAllByAuthorIdParameters,
  GetAllParameters,
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
  }: createParameters): Promise<TweetDto> {
    return await this.tweetRepository.save({
      createdAt: new Date(),
      updatedAt: new Date(),
      isComment,
      text,
      imagesURLs: JSON.stringify(imagesURLs),
      authorId,
      parentRecordAuthorId,
      parentRecordId,
    });
  }

  public async getByRecordId({
    _id,
  }: GetByRecordIdParameters): Promise<TweetDto> {
    return await this.tweetRepository.findOneBy({ _id });
  }

  public async getAllByAuthorId({
    authorId,
  }: GetAllByAuthorIdParameters): Promise<TweetDto[]> {
    return await this.tweetRepository.findBy({ authorId });
  }

  public async getAll({
    offset = 0,
    limit = 10,
    keyword = '',
  }: GetAllParameters): Promise<TweetDto[]> {
    return await this.tweetRepository.find({
      where: { text: Like('%' + keyword + '%') },
      order: { createdAt: 'DESC' },
      take: limit || 10,
      skip: offset || 0,
    });
  }

  public async update({
    _id,
    isComment,
    text,
    imagesURLs,
  }: UpdateParameters): Promise<TweetDto & { status: Status }> {
    await this.tweetRepository.update(
      { _id },
      {
        updatedAt: new Date(),
        isComment,
        text,
        imagesURLs: JSON.stringify(imagesURLs),
      },
    );

    const updatedTweet = await this.tweetRepository.findOneBy({ _id });

    return { ...updatedTweet, status: Status.success };
  }

  public async delete({ _id }: DeleteParameters): Promise<DeleteResult> {
    return await this.tweetRepository.delete({ _id });
  }
}
