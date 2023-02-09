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
import { RepostEntity } from '../infrastructure';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { RepostService } from '../application';

@UseGuards(AuthGuard)
@Controller('repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  @Post('/:tweetId')
  public async repostTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<RepostEntity> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.repostService.createRepost({
      userId,
      tweetId,
    });
  }

  @Get('amount/:tweetId')
  public async getAmountOfTweetReposts(
    @Param() params: { tweetId: string },
  ): Promise<number> {
    const { tweetId } = params;

    return await this.repostService.getAmountOfTweetReposts({ tweetId });
  }

  @Get('users/:tweetId')
  public async getUsersRepostedTweet(
    @Param() params: { tweetId: string },
  ): Promise<string[]> {
    const { tweetId } = params;

    return await this.repostService.getUsersRepostedTweet({ tweetId });
  }

  @Delete('/:tweetId')
  public async deleteRepost(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<{ status: Status }> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.repostService.deleteRepost({
      userId,
      tweetId,
    });
  }
}
