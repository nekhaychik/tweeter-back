import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { TweetModule } from '../tweet';
import { UserModule } from '../user';

// Services
import { RepostService } from './application';

// Controllers
import { RepostController } from './controller';

// Domains
import { RepostDomain } from './domain';

// Infrastructure
import { RepostEntity, RepostRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([RepostEntity]), UserModule, TweetModule],
  exports: [RepostDomain, RepostService],
  controllers: [RepostController],
  providers: [RepostEntity, RepostRepository, RepostDomain, RepostService],
})
export class RepostModule {}
