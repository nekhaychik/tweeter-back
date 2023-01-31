import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

// Services
import { UserService } from 'src/modules/user';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { RefreshSessionRepository } from 'src/modules/auth-refresh-token';

// Interfaces
import {
  SignUpParameters,
  SignUpVerifyParameters,
  SignOutParameters,
  SignInParameters,
  MakeAccessTokenParameters,
  AccessTokenConfig,
  MakeRefreshTokenInfoParameters,
  RefreshTokenInfo,
  SuccessAuthResult,
} from './auth-service.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private readonly refreshSessionRepository: RefreshSessionRepository,
  ) {}

  public async makeAccessToken({
    user,
  }: MakeAccessTokenParameters): Promise<string> {
    const config: AccessTokenConfig = {
      payload: {
        userId: user._id,
        email: user.email,
      },
      options: {
        // algorithm: 'HS512',
        subject: user._id,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    };

    return this.jwtService.signAsync(config.payload, config.options);
  }

  public async makeRefreshTokenInfo({
    userId,
    privacyInfo,
    fingerprint,
  }: MakeRefreshTokenInfoParameters): Promise<RefreshTokenInfo> {
    const refreshTokenExpiresInMilliseconds =
      new Date().getTime() + Number(process.env.JWT_REFRESH_EXPIRATION_TIME);

    const refreshTokenExpiresInSeconds =
      refreshTokenExpiresInMilliseconds / 1000;

    const newRefreshSession = {
      refreshToken: v4(),
      userId,
      ip: privacyInfo.ipAdress,
      ua: privacyInfo.userAgent,
      fingerprint,
      expiresIn: refreshTokenExpiresInMilliseconds.toString(),
      createdAt: new Date(),
    };

    await this.refreshSessionRepository.addRefreshSession({
      refreshSession: newRefreshSession,
    });

    return {
      refreshTokenExpiresInSeconds,
      refreshToken: newRefreshSession.refreshToken,
    };
  }

  public async signUp({
    email,
    username,
    password,
  }: SignUpParameters): Promise<any> {
    try {
      const user = await this.userService.createUser({
        email,
        username,
        password,
      });

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
    privacyInfo,
    fingerprint,
  }: SignUpVerifyParameters): Promise<SuccessAuthResult> {
    try {
      const user = await this.userService.getUserByEmail({ email });

      if (user.emailCode !== emailCode) {
        throw new BadRequestException(
          'Incorrect email code. Please, check your email and try again.',
        );
      }

      await this.userService.verifyUser({ userId: user._id });

      const refreshTokenInfo = await this.makeRefreshTokenInfo({
        userId: user._id,
        privacyInfo,
        fingerprint,
      });

      return {
        data: {
          accessToken: await this.makeAccessToken({ user }),
          refreshToken: refreshTokenInfo.refreshToken,
        },
        cookies: [
          {
            name: 'refreshToken',
            value: refreshTokenInfo.refreshToken,
            domain: 'localhost',
            path: '/auth',
            maxAge: refreshTokenInfo.refreshTokenExpiresInSeconds,
            secure: false, // temp: should be deleted
          },
        ],
      };
    } catch (err) {
      throw err;
    }
  }

  public async signIn({
    email,
    password,
    privacyInfo,
    fingerprint,
  }: SignInParameters): Promise<SuccessAuthResult> {
    try {
      const user = await this.userService.getUserByEmail({ email });

      if (!user.isVerified) {
        throw new BadRequestException('You are not verified.');
      }

      if (!bcrypt.compare(password, user.hashedPassword)) {
        throw new BadRequestException('Incorrect password.');
      }

      const refreshTokenInfo = await this.makeRefreshTokenInfo({
        userId: user._id,
        privacyInfo,
        fingerprint,
      });

      return {
        data: {
          accessToken: await this.makeAccessToken({ user }),
          refreshToken: refreshTokenInfo.refreshToken,
        },
        cookies: [
          {
            name: 'refreshToken',
            value: refreshTokenInfo.refreshToken,
            domain: 'localhost',
            path: '/auth',
            maxAge: refreshTokenInfo.refreshTokenExpiresInSeconds,
            secure: false, // temp: should be deleted
          },
        ],
      };
    } catch (err) {
      throw err;
    }
  }

  public async signOut({
    userId,
    cookies,
  }: SignOutParameters): Promise<{ result: string }> {
    try {
      const refreshToken = cookies['refreshToken'];

      if (!refreshToken) {
        throw new BadRequestException('Incorrect refresh token');
      }

      await this.refreshSessionRepository.removeRefreshSession({
        userId,
        refreshToken,
      });

      return {
        result: 'User was logged out',
      };
    } catch (err) {
      throw err;
    }
  }

  public getCookiesForLogOut(): string[] {
    return ['refreshToken=; HttpOnly; Path=/; Max-Age=0'];
  }
}
