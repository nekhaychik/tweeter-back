import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionDto } from '../../core';

// Entities
import { SubscriptionEntity } from '../entities';

// Interfaces
import {
  CreateParameters,
  DeleteParameters,
  GetAllSubscribersParameters,
  GetAllSubscriptionsParameters,
  GetSubscriptionParameters,
} from '../repository-interfaces';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  public async create({
    subscriberId,
    userId,
  }: CreateParameters): Promise<SubscriptionDto> {
    return await this.subscriptionRepository.save({ subscriberId, userId });
  }

  public async getAllSubscriptions({
    subscriberId,
  }: GetAllSubscriptionsParameters): Promise<SubscriptionDto[]> {
    return await this.subscriptionRepository.find({ where: { subscriberId } });
  }

  public async getAllSubscribers({
    userId,
  }: GetAllSubscribersParameters): Promise<SubscriptionDto[]> {
    return await this.subscriptionRepository.find({ where: { userId } });
  }

  public async getSubscription({
    subscriberId,
    userId,
  }: GetSubscriptionParameters): Promise<SubscriptionDto> {
    return await this.subscriptionRepository.findOneBy({
      subscriberId,
      userId,
    });
  }

  public async delete({
    subscriberId,
    userId,
  }: DeleteParameters): Promise<void> {
    await this.subscriptionRepository.delete({ subscriberId, userId });
  }
}
