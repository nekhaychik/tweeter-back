import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Interfaces
import { CurrentUser, CurrentUserArgs, Status } from 'src/core';
import { CommentEntity } from '../infrastructure';
import { CreateCommentInput, UpdateCommentInput } from './inputs';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { CommentService } from '../application';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 9, {
      storage: diskStorage({
        destination: './images/comments',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  public async createComment(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Query() query: { tweetId: string },
    @Body() body: CreateCommentInput,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ): Promise<CommentEntity> {
    const { userId } = currentUser;
    const { tweetId } = query;
    const { text } = body;

    return await this.commentService.createComment({
      userId,
      tweetId,
      text,
      files,
    });
  }

  @Get('all')
  public async getAllTweetComments(
    @Query() query: { tweetId: string; offset?: number; limit?: number },
  ): Promise<CommentEntity[]> {
    const { tweetId, offset, limit } = query;

    return await this.commentService.getAllCommentsByTweetId({
      tweetId,
      offset,
      limit,
    });
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('files', 9, {
      storage: diskStorage({
        destination: './images/comments',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  public async updateComment(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Body() body: UpdateCommentInput,
    @Query() query: { commentId: string },
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ): Promise<CommentEntity> {
    const { userId } = currentUser;
    const { text } = body;
    const { commentId } = query;

    return await this.commentService.updateComment({
      userId,
      commentId,
      text,
      files,
    });
  }

  @Delete()
  public async deleteComment(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Query() query: { commentId: string },
  ): Promise<{ status: Status }> {
    const { userId } = currentUser;
    const { commentId } = query;

    return await this.commentService.deleteComment({ userId, commentId });
  }
}
