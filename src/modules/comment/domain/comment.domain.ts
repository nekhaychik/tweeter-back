import { Injectable } from '@nestjs/common';

// Interfaces
import { CommentEntity } from '../infrastructure/entities';
import {
  CreateCommentParameters,
  DeleteCommentParameters,
  GetAllCommentsByTweetIdParameters,
  GetCommentByIdParameters,
} from './comment-domain.type';

// Repositories
import { CommentRepository } from '../infrastructure/repositories';

@Injectable()
export class CommentDomain {
  constructor(private commentRepository: CommentRepository) {}

  public async createComment({
    userId,
    tweetId,
  }: CreateCommentParameters): Promise<CommentEntity> {
    return await this.commentRepository.create({ userId, tweetId });
  }

  public async getCommentById({
    commentId,
  }: GetCommentByIdParameters): Promise<CommentEntity> {
    return await this.commentRepository.getById({ _id: commentId });
  }

  public async getAllCommentsByTweetId({
    tweetId,
    limit,
    offset,
  }: GetAllCommentsByTweetIdParameters): Promise<CommentEntity[]> {
    return await this.commentRepository.getAllByTweetId({
      tweetId,
      limit,
      offset,
    });
  }

  public async updateComment({
    commentId,
    text,
    imagesURLs,
  }): Promise<CommentEntity> {
    return await this.commentRepository.update({
      _id: commentId,
      text,
      imagesURLs,
    });
  }

  public async deleteComment({
    commentId,
  }: DeleteCommentParameters): Promise<void> {
    await this.commentRepository.delete({ _id: commentId });
  }
}
