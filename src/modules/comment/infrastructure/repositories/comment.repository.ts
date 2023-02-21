import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Interfaces
import { CommentEntity } from '../entities/comment.entity';
import {
  CreateParameters,
  DeleteParameters,
  GetAllByTweetIdParameters,
  GetByIdParameters,
  UpdateParameters,
} from '../repository-interfaces';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  public async create({
    userId,
    tweetId,
    text,
    imagesURLs,
  }: CreateParameters): Promise<CommentEntity> {
    return await this.commentRepository.save({
      userId,
      tweetId,
      text,
      imagesURLs: JSON.stringify(imagesURLs),
      createdAt: new Date(),
    });
  }

  public async getById({ _id }: GetByIdParameters): Promise<CommentEntity> {
    return await this.commentRepository.findOneBy({ _id });
  }

  public async getAllByTweetId({
    offset = 0,
    limit = 3,
    tweetId,
  }: GetAllByTweetIdParameters): Promise<CommentEntity[]> {
    return await this.commentRepository.find({
      where: { tweetId },
      order: { createdAt: 'ASC' },
      take: limit || 3,
      skip: offset || 0,
    });
  }

  public async update({
    _id,
    text,
    imagesURLs,
  }: UpdateParameters): Promise<CommentEntity> {
    await this.commentRepository.update(
      { _id },
      { text, imagesURLs: JSON.stringify(imagesURLs), isUpdated: true },
    );
    return await this.getById({ _id });
  }

  public async delete({ _id }: DeleteParameters): Promise<void> {
    await this.commentRepository.delete({ _id });
  }
}
