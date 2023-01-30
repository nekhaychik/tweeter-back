import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Services
import { UserService } from '../application';

// Interfaces
import { Status, UserDto } from 'src/core';
import { DeleteResult } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './inputs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  public async createUser(@Body() body: CreateUserInput): Promise<UserDto> {
    const { email, username, password } = body;

    return await this.userService.createUser({ email, username, password });
  }

  @Get('/:userId')
  public async getUser(@Param() params: { userId: string }): Promise<UserDto> {
    const { userId } = params;

    return await this.userService.getUserById({ userId });
  }

  @Get('/')
  public async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Delete('/:userId')
  public async deleteUser(
    @Param() params: { userId: string },
  ): Promise<DeleteResult> {
    const { userId } = params;

    return await this.userService.deleteUser({ userId });
  }

  @Put('/update-avatar/:userid')
  @UseInterceptors(FileInterceptor('file'))
  public async updateUserAvatar(
    @Param() params: { userId: string },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserDto & { status: Status }> {
    const { userId } = params;

    return await this.userService.updateUserAvatar({ userId, file });
  }

  @Put('update/:userId')
  public async updateUser(
    @Param() params: { userId: string },
    @Body() body: UpdateUserInput,
  ): Promise<UserDto & { status: Status }> {
    const { userId } = params;
    const { email, password, username } = body;

    return await this.userService.updateUser({
      userId,
      email,
      username,
      password,
    });
  }
}
