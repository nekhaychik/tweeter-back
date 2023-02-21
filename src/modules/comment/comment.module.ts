import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { TweetModule } from '../tweet';
import { UserModule } from '../user';

// Services
import { CommentService } from './application';

// Controllers
import { CommentController } from './controller';

// Domains
import { CommentDomain } from './domain';

// Infrastructure
import { CommentEntity, CommentRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UserModule, TweetModule],
  exports: [CommentDomain, CommentService],
  controllers: [CommentController],
  providers: [CommentEntity, CommentRepository, CommentDomain, CommentService],
})
export class CommentModule {}
