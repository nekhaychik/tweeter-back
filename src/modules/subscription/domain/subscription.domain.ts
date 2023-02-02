import { Injectable } from '@nestjs/common';

// Repositories
import { SubscriptionRepository } from '../infrastructure';

// Interfaces
import {
  CreateSubscriptionParameters,
  DeleteSubscriptionParameters,
  GetAllSubscribersParameters,
  GetAllSubscriptionsParameters,
  GetSubscriptionParameters,
} from './subscription-domain.type';
import { SubscriptionDto } from '../core';

@Injectable()
export class SubscriptionDomain {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  public async createSubscription({
    subscriberId,
    userId,
  }: CreateSubscriptionParameters): Promise<SubscriptionDto> {
    return await this.subscriptionRepository.create({ subscriberId, userId });
  }

  public async getAllSubscriptions({
    subscriberId,
  }: GetAllSubscriptionsParameters): Promise<SubscriptionDto[]> {
    return await this.subscriptionRepository.getAllSubscriptions({
      subscriberId,
    });
  }

  public async getAllSubscribers({
    userId,
  }: GetAllSubscribersParameters): Promise<SubscriptionDto[]> {
    return await this.subscriptionRepository.getAllSubscribers({ userId });
  }

  public async getSubscription({
    subscriberId,
    userId,
  }: GetSubscriptionParameters): Promise<SubscriptionDto> {
    return await this.subscriptionRepository.getSubscription({
      subscriberId,
      userId,
    });
  }

  public async deleteSubscription({
    subscriberId,
    userId,
  }: DeleteSubscriptionParameters): Promise<void> {
    await this.subscriptionRepository.delete({ subscriberId, userId });
  }
}
