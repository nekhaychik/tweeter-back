import { Injectable } from '@nestjs/common';
import { Status, UserDto } from 'src/core';
import { DeleteResult, UpdateResult } from 'typeorm';

// Infrastructure
import { UserRepository } from '../infrastructure';

// Interfaces
import {
  CreateUserParameters,
  DeleteUserParameters,
  GetUserByEmailParameters,
  GetUserByIdParameters,
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
    username,
    hashedPassword,
    emailCode,
  }: CreateUserParameters): Promise<UserDto> {
    return await this.userRepository.create({
      email,
      username,
      hashedPassword,
      emailCode,
    });
  }

  public async getAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.getAllUsers();
  }

  public async getUserByEmail({
    email,
  }: GetUserByEmailParameters): Promise<UserDto> {
    return await this.userRepository.getByEmail({ email });
  }

  public async getUserById({
    userId,
  }: GetUserByIdParameters): Promise<UserDto> {
    return await this.userRepository.getById({ _id: userId });
  }

  public async updateUser({
    userId,
    email,
    username,
    avatarURL,
    hashedPassword,
    emailCode,
    description,
  }: UpdateUserParameters): Promise<UserDto & { status: Status }> {
    return await this.userRepository.update({
      _id: userId,
      email,
      username,
      avatarURL,
      hashedPassword,
      emailCode,
      description,
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

  public async verifyUser({ userId }: VerifyUserParameters): Promise<void> {
    return this.userRepository.verify({ _id: userId });
  }

  public async removeRefreshToken({
    userId,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    return this.userRepository.removeRefrehToken({ _id: userId });
  }
}
