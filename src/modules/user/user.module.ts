import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UserService } from './application';

// Domains
import { UserDomain } from './domain';

// Infrastructure
import { UserEntity, UserRepository } from './infrastructure';

// Controllers
import { UserController } from './controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      dest: process.env.MULTER_FOLDER,
    }),
  ],
  controllers: [UserController],
  exports: [UserService, UserDomain],
  providers: [UserEntity, UserRepository, UserDomain, UserService],
})
export class UserModule {}
