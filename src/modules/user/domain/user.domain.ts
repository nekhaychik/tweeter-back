import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity, UserRepository } from '../infrastructure';
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
    _id,
    email,
    hashedPassword,
    emailCode,
  }: UpdateUserParameters): Promise<UpdateResult> {
    return await this.userRepository.update({
      _id,
      email,
      hashedPassword,
      emailCode,
    });
  }

  public async deleteUser({
    _id,
  }: DeleteUserParameters): Promise<DeleteResult> {
    return await this.userRepository.delete({ _id });
  }

  public async setCurrentRefreshToken({
    _id,
    currentHashedRefreshToken,
  }: SetCurrentRefreshTokenParameters): Promise<void> {
    await this.userRepository.setRefreshToken({
      _id,
      currentHashedRefreshToken,
    });
  }

  public async verifyUser({
    _id,
  }: VerifyUserParameters): Promise<UpdateResult> {
    return this.userRepository.verifyUser({ _id });
  }

  public async removeRefreshToken({
    _id,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    return this.userRepository.removeRefrehToken({ _id });
  }
}
