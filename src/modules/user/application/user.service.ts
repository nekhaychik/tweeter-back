import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// Entity
import { UserEntity } from '../infrastructure';

// Domains
import { UserDomain } from '../domain';

// Interfaces
import {
  CreateUserParameters,
  DeleteUserParameters,
  GetUserByEmailParameters,
  GetUserIfRefreshTokenMatchesParameters,
  RemoveRefreshTokenParameters,
  SetCurrentRefreshTokenParameters,
  UpdateUserParameters,
  VerifyUserParameters,
} from './user-service.type';

@Injectable()
export class UserService {
  constructor(private readonly userDomain: UserDomain) {}

  public async getUserIfRefreshTokenMatches({
    refreshToken,
    email,
  }: GetUserIfRefreshTokenMatchesParameters): Promise<UserEntity> {
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

  public async createUser({ email, password }: CreateUserParameters) {
    try {
      let user = await this.userDomain.getUserByEmail({ email });

      if (user) {
        throw new BadRequestException('User with this email already exist');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.ROUNDED_SALT,
      );

      const emailCode = crypto.randomBytes(6).toLocaleString();

      user = await this.userDomain.createUser({
        email,
        hashedPassword,
        emailCode,
      });

      return user;
    } catch (err) {
      throw err;
    }
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
  }: GetUserByEmailParameters): Promise<UserEntity> {
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
    password,
    emailCode,
  }: UpdateUserParameters): Promise<UpdateResult> {
    try {
      if (password) {
        password = await bcrypt.hash(password, +process.env.ROUNDED_SALT);
      }

      return await this.userDomain.updateUser({
        userId,
        email,
        hashedPassword: password,
        emailCode,
      });
    } catch (err) {
      throw err;
    }
  }

  public async verifyUser({
    userId,
  }: VerifyUserParameters): Promise<UpdateResult> {
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
