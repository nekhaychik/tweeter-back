import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { TweetModule } from '../tweet';
import { UserModule } from '../user';

// Services
import { SavedService } from './application';

// Controllers
import { SavedController } from './controller';

// Domains
import { SavedDomain } from './domain';

// Infrastructure
import { SavedEntity, SavedRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([SavedEntity]), UserModule, TweetModule],
  exports: [SavedDomain, SavedService],
  controllers: [SavedController],
  providers: [SavedEntity, SavedRepository, SavedDomain, SavedService],
})
export class SavedModule {}
