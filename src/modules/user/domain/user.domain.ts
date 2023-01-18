import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

// Infrastructure
import { UserEntity, UserRepository } from '../infrastructure';

// Interfaces
import {
  CreateUserParameters,
  DeleteUserParameters,
  GetUserByEmailParameters,
  RemoveRefreshTokenParameters,
  SetCurrentRefreshTokenParameters,
  UpdateUserParameters,
  VerifyUserParameters,
} from './user-domain.type';

@Injectable()
export class UserDomain {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser({
    email,
    hashedPassword,
    emailCode,
  }: CreateUserParameters): Promise<UserEntity> {
    return await this.userRepository.create({
      email,
      hashedPassword,
      emailCode,
    });
  }

  public async getUserByEmail({
    email,
  }: GetUserByEmailParameters): Promise<UserEntity> {
    return await this.userRepository.getByEmail({ email });
  }

  public async updateUser({
    userId,
    email,
    hashedPassword,
    emailCode,
  }: UpdateUserParameters): Promise<UpdateResult> {
    return await this.userRepository.update({
      _id: userId,
      email,
      hashedPassword,
      emailCode,
    });
  }

  public async deleteUser({
    userId,
  }: DeleteUserParameters): Promise<DeleteResult> {
    return await this.userRepository.delete({ _id: userId });
  }

  public async setCurrentRefreshToken({
    userId,
    currentHashedRefreshToken,
  }: SetCurrentRefreshTokenParameters): Promise<void> {
    await this.userRepository.setRefreshToken({
      _id: userId,
      currentHashedRefreshToken,
    });
  }

  public async verifyUser({
    userId,
  }: VerifyUserParameters): Promise<UpdateResult> {
    return this.userRepository.verify({ _id: userId });
  }

  public async removeRefreshToken({
    userId,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    return this.userRepository.removeRefrehToken({ _id: userId });
  }
}
