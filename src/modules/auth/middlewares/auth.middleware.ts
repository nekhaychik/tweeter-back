import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

// Services
import { UserService } from 'src/modules/user';
import { JwtService } from '@nestjs/jwt';

// Interfaces
import { UserDto } from 'src/core';
import { AccessTokenPayload } from '../core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async use(
    req: Request | any,
    res: Response,
    next: () => void,
  ): Promise<void> {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user: UserDto;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const payload: AccessTokenPayload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      user = await this.userService.getUserById({ userId: payload.userId });
    } catch (err) {
      req.currentUser = null;
    }

    if (user) {
      req.currentUser = user;
    } else {
      req.currentUser = null;
    }

    next();
  }
}
