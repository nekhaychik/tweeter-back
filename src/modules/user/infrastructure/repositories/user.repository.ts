import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    hashedPassword,
    emailCode,
  }: CreateParameters): Promise<UserEntity> {
    return await this.userRepository.save({
      email,
      hashedPassword,
      emailCode,
    });
  }

  public async getByEmail({
    email,
  }: GetByEmailParameters): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  public async getById({ _id }: GetByIdParameters): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ _id });
  }

  public async update({
    _id,
    email,
    hashedPassword,
    emailCode,
  }: UpdateParameters): Promise<UpdateResult> {
    return await this.userRepository.update(
      { _id },
      { email, hashedPassword, emailCode },
    );
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

  public async verify({ _id }: VerifyParameters): Promise<UpdateResult> {
    return await this.userRepository.update({ _id }, { isVerified: true });
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
