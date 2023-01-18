import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserDomain } from '../domain';
import * as bcrypt from 'bcrypt';
import {
  CreateUserParameters,
  DeleteUserParameters,
  GetUserByEmailParameters,
  RemoveRefreshTokenParameters,
  SetCurrentRefreshTokenParameters,
  UpdateUserParameters,
  VerifyUserParameters,
} from './user-service.type';
import { UserEntity } from '../infrastructure';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userDomain: UserDomain) {}

  public async getUserIfRefreshTokenMatches({ refreshToken, email }) {
    const user = await this.userDomain.getUserByEmail({ email });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  public async createUser({ email, password }: CreateUserParameters) {
    try {
      let user = await this.userDomain.getUserByEmail({ email });

      if (user) {
        throw new BadRequestException('User with this email already exist');
      }

      let hashedPassword = '';

      bcrypt.hash(password, +process.env.ROUNDED_SALT, (err, hash) => {
        if (err) {
          throw err;
        }

        hashedPassword = hash;
      });

      const emailCode = crypto.randomBytes(6).toString();

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
    _id,
    refreshToken,
  }: SetCurrentRefreshTokenParameters): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userDomain.setCurrentRefreshToken({
      _id,
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
    _id,
  }: DeleteUserParameters): Promise<DeleteResult> {
    try {
      return await this.userDomain.deleteUser({ _id });
    } catch (err) {
      throw err;
    }
  }

  public async updateUser({
    _id,
    email,
    password,
    emailCode,
  }: UpdateUserParameters): Promise<UpdateResult> {
    try {
      if (password) {
        password = await bcrypt.hash(password, +process.env.ROUNDED_SALT);
      }

      return await this.userDomain.updateUser({
        _id,
        email,
        hashedPassword: password,
        emailCode,
      });
    } catch (err) {
      throw err;
    }
  }

  public async verifyUser({
    _id,
  }: VerifyUserParameters): Promise<UpdateResult> {
    try {
      return await this.userDomain.verifyUser({ _id });
    } catch (err) {
      throw err;
    }
  }

  public async removeRefreshToken({
    _id,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    try {
      return await this.userDomain.removeRefreshToken({ _id });
    } catch (err) {
      throw err;
    }
  }
}
