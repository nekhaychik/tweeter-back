import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

// Interfaces
import { CurrentUser, CurrentUserArgs, Status } from 'src/core';
import { LikeEntity } from '../infrastructure';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { LikeService } from '../application';

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/:tweetId')
  public async likeTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<LikeEntity> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.likeService.createLike({
      userId,
      tweetId,
    });
  }

  @Get('amount/:tweetId')
  public async getAmountOfTweetLikes(
    @Param() params: { tweetId: string },
  ): Promise<number> {
    const { tweetId } = params;

    return await this.likeService.getAmountOfTweetLikes({ tweetId });
  }

  @Get('users/:tweetId')
  public async getUsersLikedTweet(
    @Param() params: { tweetId: string },
  ): Promise<string[]> {
    const { tweetId } = params;

    return await this.likeService.getUsersLikedTweet({ tweetId });
  }

  @Delete('/')
  public async unlike(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<{ status: Status }> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.likeService.deleteLike({
      userId,
      tweetId,
    });
  }
}
