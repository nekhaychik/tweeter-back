import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

// Interfaces
import { CurrentUser, CurrentUserArgs } from 'src/core';
import { SubscriptionDto } from '../core';

// Guards
import { AuthGuard } from 'src/modules/auth/guard';

// Services
import { SubscriptionService } from '../application';

@UseGuards(AuthGuard)
@Controller('/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/')
  public async subscribe(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Query() query: { userId: string },
  ): Promise<SubscriptionDto> {
    const { userId: subscriberId } = currentUser;
    const { userId } = query;

    return await this.subscriptionService.createSubscription({
      subscriberId,
      userId,
    });
  }

  @Get('/get-my-subscriptions')
  public async getMySubscriptions(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<SubscriptionDto[]> {
    const { userId: subscriberId } = currentUser;

    return await this.subscriptionService.getAllSubscriptions({ subscriberId });
  }

  @Get('/get-subscriptions')
  public async getUserSubscription(
    @Query() query: { userId: string },
  ): Promise<SubscriptionDto[]> {
    const { userId: subscriberId } = query;

    return await this.subscriptionService.getAllSubscriptions({ subscriberId });
  }

  @Get('get-my-subscribers')
  public async getMySubscribers(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<SubscriptionDto[]> {
    const { userId } = currentUser;

    return await this.subscriptionService.getAllSubscribers({ userId });
  }

  @Get('get-subscribers')
  public async getUserSubscribers(
    @Query() query: { userId: string },
  ): Promise<SubscriptionDto[]> {
    const { userId } = query;

    return await this.subscriptionService.getAllSubscribers({ userId });
  }

  @Delete('/')
  public async unsubscribe(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Query() query: { userId: string },
  ): Promise<{ status: string }> {
    const { userId: subscriberId } = currentUser;
    const { userId } = query;

    return await this.subscriptionService.deleteSubscription({
      subscriberId,
      userId,
    });
  }
}
