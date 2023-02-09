import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { TweetModule } from '../tweet';
import { UserModule } from '../user';

// Services
import { LikeService } from './application';

// Controllers
import { LikeController } from './controller';

// Domains
import { LikeDomain } from './domain';

// Infrastructure
import { LikeEntity, LikeRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), UserModule, TweetModule],
  exports: [LikeDomain, LikeService],
  controllers: [LikeController],
  providers: [LikeEntity, LikeRepository, LikeDomain, LikeService],
})
export class LikeModule {}
