import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// Domains
import { UserDomain } from '../domain';

// Interfaces
import {
  CreateUserParameters,
  DeleteUserParameters,
  GetUserByEmailParameters,
  GetUserByIdParameters,
  GetUserIfRefreshTokenMatchesParameters,
  RemoveRefreshTokenParameters,
  SetCurrentRefreshTokenParameters,
  UpdateUserAvatarParameters,
  UpdateUserParameters,
  VerifyUserParameters,
} from './user-service.type';
import { Status, UserDto } from 'src/core';

@Injectable()
export class UserService {
  constructor(private readonly userDomain: UserDomain) {}

  public async getUserIfRefreshTokenMatches({
    refreshToken,
    email,
  }: GetUserIfRefreshTokenMatchesParameters): Promise<UserDto> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.currentHashedRefreshToken,
      );

      if (!isRefreshTokenMatching) {
        throw new BadRequestException('Refresh token is not correct');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async createUser({ email, username, password }: CreateUserParameters) {
    try {
      let user = await this.userDomain.getUserByEmail({ email });

      if (user) {
        throw new BadRequestException('User with this email already exist');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.ROUNDED_SALT,
      );

      const emailCode = crypto.randomBytes(6).toString('hex');

      user = await this.userDomain.createUser({
        email,
        username,
        hashedPassword,
        emailCode,
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async getAllUsers(): Promise<UserDto[]> {
    return await this.userDomain.getAllUsers();
  }

  public async setCurrentRefreshToken({
    userId,
    refreshToken,
  }: SetCurrentRefreshTokenParameters): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(
      refreshToken,
      +process.env.ROUNDED_SALT,
    );

    await this.userDomain.setCurrentRefreshToken({
      userId,
      currentHashedRefreshToken,
    });
  }

  public async getUserByEmail({
    email,
  }: GetUserByEmailParameters): Promise<UserDto> {
    try {
      const user = await this.userDomain.getUserByEmail({ email });

      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async getUserById({
    userId,
  }: GetUserByIdParameters): Promise<UserDto> {
    try {
      const user = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException('User with this id does not exist');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async deleteUser({
    userId,
  }: DeleteUserParameters): Promise<DeleteResult> {
    try {
      return await this.userDomain.deleteUser({ userId });
    } catch (err) {
      throw err;
    }
  }

  public async updateUser({
    userId,
    email,
    username,
    password,
    emailCode,
  }: UpdateUserParameters): Promise<UserDto & { status: Status }> {
    try {
      if (password) {
        password = await bcrypt.hash(password, +process.env.ROUNDED_SALT);
      }

      return await this.userDomain.updateUser({
        userId,
        email,
        username,
        hashedPassword: password,
        emailCode,
      });
    } catch (err) {
      throw err;
    }
  }

  public async updateUserAvatar({
    userId,
    file,
  }: UpdateUserAvatarParameters): Promise<UserDto & { status: Status }> {
    try {
      const avatarURL = file.path;

      const user = await this.userDomain.getUserById({ userId });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      return await this.userDomain.updateUser({ userId, avatarURL });
    } catch (err) {
      throw err;
    }
  }

  public async verifyUser({ userId }: VerifyUserParameters): Promise<void> {
    try {
      return await this.userDomain.verifyUser({ userId });
    } catch (err) {
      throw err;
    }
  }

  public async removeRefreshToken({
    userId,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    try {
      return await this.userDomain.removeRefreshToken({ userId });
    } catch (err) {
      throw err;
    }
  }
}
