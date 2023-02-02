import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { UserModule } from '../user';

// Controllers
import { SubscriptionController } from './controller';

// Services
import { SubscriptionService } from './application';

// Domains
import { SubscriptionDomain } from './domain';

// Infrastructure
import { SubscriptionEntity, SubscriptionRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity]), UserModule],
  controllers: [SubscriptionController],
  exports: [SubscriptionService],
  providers: [
    SubscriptionEntity,
    SubscriptionRepository,
    SubscriptionDomain,
    SubscriptionService,
  ],
})
export class SubscriptionModule {}
