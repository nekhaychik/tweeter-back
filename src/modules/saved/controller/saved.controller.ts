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
import { SavedEntity } from '../infrastructure';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { SavedService } from '../application';

@UseGuards(AuthGuard)
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post('/:tweetId')
  public async saveTweet(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<SavedEntity> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.savedService.createSaved({
      userId,
      tweetId,
    });
  }

  @Get('amount/:tweetId')
  public async getAmountOfTweetSaved(
    @Param() params: { tweetId: string },
  ): Promise<number> {
    const { tweetId } = params;

    return await this.savedService.getAmountOfTweetSaved({ tweetId });
  }

  @Get('users/:tweetId')
  public async getUsersSavedTweet(
    @Param() params: { tweetId: string },
  ): Promise<string[]> {
    const { tweetId } = params;

    return await this.savedService.getUsersSavedTweet({ tweetId });
  }

  @Get('my-all')
  public async getAllUserSaved(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<SavedEntity[]> {
    const { userId } = currentUser;

    return await this.savedService.getAllSavedByUserId({ userId });
  }

  @Delete('/:tweetId')
  public async deleteSaved(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Param() params: { tweetId: string },
  ): Promise<{ status: Status }> {
    const { userId } = currentUser;
    const { tweetId } = params;

    return await this.savedService.deleteSaved({
      userId,
      tweetId,
    });
  }
}
