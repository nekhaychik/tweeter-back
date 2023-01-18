import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UserService } from './application';

// Domains
import { UserDomain } from './domain';

// Infrastructure
import { UserEntity, UserRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  exports: [UserService],
  providers: [UserEntity, UserRepository, UserDomain, UserService],
})
export class UserModule {}
