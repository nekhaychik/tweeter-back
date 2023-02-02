import { BadRequestException, Injectable } from '@nestjs/common';

// Domains
import { UserDomain } from 'src/modules/user';
import { SubscriptionDomain } from '../domain';

// Interfaces
import { SubscriptionDto } from '../core';
import {
  CreateSubscriptionParameters,
  DeleteSubscriptionParameters,
  GetAllSubscribersParameters,
  GetAllSubscriptionsParameters,
  GetSubscriptionParameters,
} from './subscription-service.type';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionDomain: SubscriptionDomain,
    private readonly userDomain: UserDomain,
  ) {}

  public async createSubscription({
    subscriberId,
    userId,
  }: CreateSubscriptionParameters): Promise<SubscriptionDto> {
    try {
      const subscriber = await this.userDomain.getUserById({
        userId: subscriberId,
      });

      if (!subscriber) {
        throw new BadRequestException(
          `User with id ${subscriberId} does not exist`,
        );
      }

      const user = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException(`User with id ${userId} does not exist`);
      }

      const subscription = await this.subscriptionDomain.getSubscription({
        subscriberId,
        userId,
      });

      if (subscription) {
        throw new BadRequestException('You are already following this user');
      }

      return await this.subscriptionDomain.createSubscription({
        subscriberId,
        userId,
      });
    } catch (err) {
      throw err;
    }
  }

  public async getAllSubscriptions({
    subscriberId,
  }: GetAllSubscriptionsParameters): Promise<SubscriptionDto[]> {
    try {
      const subscriber = await this.userDomain.getUserById({
        userId: subscriberId,
      });

      if (!subscriber) {
        throw new BadRequestException(
          `User with id ${subscriberId} does not exist`,
        );
      }

      return await this.subscriptionDomain.getAllSubscriptions({
        subscriberId,
      });
    } catch (err) {
      throw err;
    }
  }

  public async getAllSubscribers({
    userId,
  }: GetAllSubscribersParameters): Promise<SubscriptionDto[]> {
    try {
      const user = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException(`User with id ${userId} does not exist`);
      }

      return await this.subscriptionDomain.getAllSubscribers({ userId });
    } catch (err) {
      throw err;
    }
  }

  public async getSubscription({
    subscriberId,
    userId,
  }: GetSubscriptionParameters): Promise<SubscriptionDto> {
    try {
      const subscriber = await this.userDomain.getUserById({
        userId: subscriberId,
      });

      if (!subscriber) {
        throw new BadRequestException(
          `User with id ${subscriberId} does not exist`,
        );
      }

      const user = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException(`User with id ${userId} does not exist`);
      }

      const subscription = await this.subscriptionDomain.getSubscription({
        subscriberId,
        userId,
      });

      if (!subscription) {
        throw new BadRequestException('Subscription does not exist');
      }

      return subscription;
    } catch (err) {
      throw err;
    }
  }

  public async deleteSubscription({
    subscriberId,
    userId,
  }: DeleteSubscriptionParameters): Promise<{ status: string }> {
    try {
      const subscription = await this.subscriptionDomain.getSubscription({
        subscriberId,
        userId,
      });

      if (!subscription) {
        throw new BadRequestException('Subscription does not exist');
      }

      await this.subscriptionDomain.deleteSubscription({
        subscriberId,
        userId,
      });

      return { status: 'Successfully deleted' };
    } catch (err) {
      throw err;
    }
  }
}
