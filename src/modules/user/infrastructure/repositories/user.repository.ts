import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, UserDto } from 'src/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// Entity
import { UserEntity } from '../entities';

// Interfaces
import {
  CreateParameters,
  DeleteParameters,
  GetByEmailParameters,
  GetByIdParameters,
  RemoveRefreshTokenParameters,
  SetRefreshTokenParameters,
  UpdateParameters,
  VerifyParameters,
} from '../repository-interfaces';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async create({
    email,
    username,
    hashedPassword,
    emailCode,
  }: CreateParameters): Promise<UserDto> {
    return await this.userRepository.save({
      email,
      username,
      hashedPassword,
      emailCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public async getAllUsers(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  public async getByEmail({ email }: GetByEmailParameters): Promise<UserDto> {
    return await this.userRepository.findOneBy({ email });
  }

  public async getById({ _id }: GetByIdParameters): Promise<UserDto> {
    return await this.userRepository.findOneBy({ _id });
  }

  public async update({
    _id,
    email,
    username,
    avatarURL,
    hashedPassword,
    emailCode,
  }: UpdateParameters): Promise<UserDto & { status: Status }> {
    await this.userRepository.update(
      { _id },
      {
        email,
        username,
        avatarURL,
        hashedPassword,
        emailCode,
        updatedAt: new Date(),
      },
    );

    const updatedUser = await this.userRepository.findOneBy({ _id });

    return { ...updatedUser, status: Status.success };
  }

  public async delete({ _id }: DeleteParameters): Promise<DeleteResult> {
    return await this.userRepository.delete({ _id });
  }

  public async setRefreshToken({
    _id,
    currentHashedRefreshToken,
  }: SetRefreshTokenParameters): Promise<void> {
    await this.userRepository.update(
      { _id },
      {
        currentHashedRefreshToken,
      },
    );
  }

  public async verify({ _id }: VerifyParameters): Promise<void> {
    await this.userRepository.update({ _id }, { isVerified: true });
  }

  public async removeRefrehToken({
    _id,
  }: RemoveRefreshTokenParameters): Promise<UpdateResult> {
    return this.userRepository.update(
      { _id },
      { currentHashedRefreshToken: null },
    );
  }
}
