import { BadRequestException, Injectable } from '@nestjs/common';

// Interfaces
import { Status, UserDto } from 'src/core';
import { TweetDto } from 'src/modules/tweet/core';
import { CommentEntity } from '../infrastructure';
import {
  CreateCommentParameters,
  DeleteCommentParameters,
  GetAllCommentsByTweetIdParameters,
  UpdateCommentParameters,
} from './comment-service.type';

// Domains
import { TweetDomain } from 'src/modules/tweet/domain';
import { UserDomain } from 'src/modules/user';
import { CommentDomain } from '../domain';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentDomain: CommentDomain,
    private readonly userDomain: UserDomain,
    private readonly tweetDomain: TweetDomain,
  ) {}

  public async createComment({
    userId,
    tweetId,
    text,
    files,
  }: CreateCommentParameters): Promise<CommentEntity> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      if (!text && (!files || files.length === 0)) {
        throw new BadRequestException('Comment cannot be empty.');
      }

      const imagesURLs = [];

      if (files) {
        files.forEach((file: Express.Multer.File) => {
          imagesURLs.push(file.filename);
        });
      }

      return await this.commentDomain.createComment({
        userId,
        tweetId,
        text,
        imagesURLs,
      });
    } catch (err) {
      throw err;
    }
  }

  public async getAllCommentsByTweetId({
    tweetId,
    offset,
    limit,
  }: GetAllCommentsByTweetIdParameters): Promise<CommentEntity[]> {
    try {
      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId,
      });

      if (!tweet) {
        throw new BadRequestException(
          `Tweet with id=${tweetId} does not exist`,
        );
      }

      if (offset < 0 || limit < 0) {
        throw new BadRequestException(
          'Offset and limit should be positive numbers',
        );
      }

      return await this.commentDomain.getAllCommentsByTweetId({
        tweetId,
        limit,
        offset,
      });
    } catch (err) {
      throw err;
    }
  }

  public async updateComment({
    userId,
    commentId,
    text,
    files,
  }: UpdateCommentParameters): Promise<CommentEntity> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const comment: CommentEntity = await this.commentDomain.getCommentById({
        commentId,
      });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      if (!comment) {
        throw new BadRequestException(
          `Comment with id=${commentId} does not exist`,
        );
      }

      if (comment.userId !== userId) {
        throw new BadRequestException(
          'You do not have permissions to update this comment',
        );
      }

      const imagesURLs = [];

      if (files) {
        files.forEach((file: Express.Multer.File) => {
          imagesURLs.push(file.filename);
        });
      }

      return await this.commentDomain.updateComment({
        commentId,
        text,
        imagesURLs,
      });
    } catch (err) {
      throw err;
    }
  }

  public async deleteComment({
    commentId,
    userId,
  }: DeleteCommentParameters): Promise<{ status: Status }> {
    try {
      const user: UserDto = await this.userDomain.getUserById({ userId });
      const comment: CommentEntity = await this.commentDomain.getCommentById({
        commentId,
      });

      if (!user) {
        throw new BadRequestException(`User with id=${userId} does not exist`);
      }

      if (!comment) {
        throw new BadRequestException(
          `Comment with id=${commentId} does not exist`,
        );
      }

      const tweet: TweetDto = await this.tweetDomain.getTweetByTweetId({
        tweetId: comment.tweetId,
      });

      if (comment.userId !== userId || tweet.authorId !== userId) {
        throw new BadRequestException(
          'You do not have permissions to delete this comment',
        );
      }

      await this.commentDomain.deleteComment({ commentId });

      return { status: Status.success };
    } catch (err) {
      throw err;
    }
  }
}
