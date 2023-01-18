import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application';
import { UserDomain } from './domain';
import { UserEntity, UserRepository } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  exports: [UserService],
  providers: [UserEntity, UserRepository, UserDomain, UserService],
})
export class UserModule {}
