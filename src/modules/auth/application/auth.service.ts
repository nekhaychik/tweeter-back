import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Services
import { UserService } from 'src/modules/user';
import { MailerService } from '@nestjs-modules/mailer';

// Interfaces
import {
  GetCookieWithJwtAccessTokenParameters,
  GetCookieWithJwtRefreshTokenParameters,
  RefreshTokenCookie,
  SignUpParameters,
  SignUpVerifyResponse,
  SignUpVerifyParameters,
  SignOutParameters,
  SignInParameters,
  SigInResponse,
} from './auth-service.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
  ) {}

  public getCookieWithJwtAccessToken({
    userId,
  }: GetCookieWithJwtAccessTokenParameters): string {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }

  public getCookieWithJwtRefreshToken({
    userId,
  }: GetCookieWithJwtRefreshTokenParameters): RefreshTokenCookie {
    const payload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: +process.env.JWT_REFRESH_EXPIRATION_TIME,
    });

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;

    return {
      cookie,
      token,
    };
  }

  public async signUp({ email, password }: SignUpParameters): Promise<any> {
    try {
      const user = await this.userService.createUser({ email, password });

      const response = await this.mailService.sendMail({
        to: user.email,
        from: process.env.MAILER_FROM_EMAIL,
        subject: 'Email Code',
        text: `Yor email code: ${user.emailCode}`,
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  public async signUpVerify({
    email,
    emailCode,
  }: SignUpVerifyParameters): Promise<SignUpVerifyResponse> {
    try {
      const user = await this.userService.getUserByEmail({ email });

      if (user.emailCode !== emailCode) {
        throw new BadRequestException(
          'Incorrect email code. Please, check your email and try again.',
        );
      }

      const result = await this.userService.verifyUser({ userId: user._id });

      if (!result) {
        throw new Error('Something went wrong...');
      }

      const accessTokenCookie = this.getCookieWithJwtAccessToken({
        userId: user._id,
      });

      const refreshTokenCookie = this.getCookieWithJwtRefreshToken({
        userId: user._id,
      });

      await this.userService.setCurrentRefreshToken({
        userId: user._id,
        refreshToken: refreshTokenCookie.token,
      });

      return {
        result,
        accessTokenCookie,
        refreshTokenCookie,
      };
    } catch (err) {
      throw err;
    }
  }

  public async signIn({
    email,
    password,
  }: SignInParameters): Promise<SigInResponse> {
    try {
      const user = await this.userService.getUserByEmail({ email });

      if (!user.isVerified) {
        throw new BadRequestException('You are not verified.');
      }

      if (!bcrypt.compare(password, user.hashedPassword)) {
        throw new BadRequestException('Incorrect password.');
      }

      const accessTokenCookie = this.getCookieWithJwtAccessToken({
        userId: user._id,
      });

      const refreshTokenCookie = this.getCookieWithJwtRefreshToken({
        userId: user._id,
      });

      await this.userService.setCurrentRefreshToken({
        userId: user._id,
        refreshToken: refreshTokenCookie.token,
      });

      return {
        user,
        accessTokenCookie,
        refreshTokenCookie,
      };
    } catch (err) {
      throw err;
    }
  }

  public async signOut({ email }: SignOutParameters): Promise<UpdateResult> {
    try {
      const user = await this.userService.getUserByEmail({ email });

      return await this.userService.removeRefreshToken({ userId: user._id });
    } catch (err) {
      throw err;
    }
  }

  public getCookiesForLogOut(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
