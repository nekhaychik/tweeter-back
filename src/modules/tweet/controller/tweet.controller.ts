import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { TweetService } from '../application';

// Interfaces
import { CurrentUser, CurrentUserArgs, Status } from 'src/core';
import { TweetDto } from '../core';
import {
  CreateTweetInput,
  GetAllTweetsQuery,
  UpdateTweetInput,
} from './inputs';
import { DeleteResult } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AuthGuard)
@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('files', 9, {
      storage: diskStorage({
        destination: './images/tweets',
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
  public async createTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Body() body: CreateTweetInput,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ): Promise<TweetDto> {
    const { userId } = currentUser;
    const { isComment, text } = body;

    return await this.tweetService.createTweet({
      userId,
      isComment,
      text,
      files,
    });
  }

  @Get('/image')
  public async getImage(
    @Query() query: { filename: string },
    @Res() res,
  ): Promise<any> {
    const { filename } = query;

    res.sendFile(filename, { root: 'images/tweets' });
  }

  @Post('repost/:tweetId')
  public async repostTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<TweetDto> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.tweetService.repostTweet({ userId, tweetId });
  }

  @Get('/')
  public async getTweetById(
    @Query() params: { tweetId: string },
  ): Promise<TweetDto> {
    const { tweetId } = params;

    return await this.tweetService.getTweetById({ tweetId });
  }

  @Get('all-tweets/:userId')
  public async getAllUserTweets(
    @Param() params: { userId: string },
  ): Promise<TweetDto[]> {
    const { userId } = params;

    return await this.tweetService.getAllUserTweets({ userId });
  }

  @Get('my-tweets')
  public async getAllMyTweets(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<TweetDto[]> {
    const { userId } = currentUser;

    return await this.tweetService.getAllUserTweets({ userId });
  }

  @Get('all')
  public async getAllTweets(
    @Query() query: GetAllTweetsQuery,
  ): Promise<TweetDto[]> {
    const { limit, offset, keyword } = query;

    return await this.tweetService.getAllTweets({ limit, offset, keyword });
  }

  @Put('/:tweetId')
  public async updateTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Body() body: UpdateTweetInput,
    @Param() params: { tweetId: string },
  ): Promise<TweetDto & { status: Status }> {
    const { tweetId } = params;
    const { userId } = currentUser;
    const { text, isComment } = body;

    return await this.tweetService.updateTweetWithoutImages({
      userId,
      tweetId,
      text,
      isComment,
    });
  }

  @Delete('/:tweetId')
  public async deleteTweet(
    @Param() params: { tweetId: string },
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<DeleteResult> {
    const { tweetId } = params;
    const { userId } = currentUser;

    return await this.tweetService.deleteTweet({ userId, tweetId });
  }
}
