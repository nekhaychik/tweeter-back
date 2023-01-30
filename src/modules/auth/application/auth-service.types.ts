import { UserDto } from 'src/core';
import { UpdateResult } from 'typeorm';

export interface GetCookieWithJwtAccessTokenParameters {
  userId: string;
  email: string;
}

export interface GetCookieWithJwtRefreshTokenParameters {
  userId: string;
  email: string;
}

export interface RefreshTokenCookie {
  cookie: string;
  token: string;
}

export interface SignUpParameters {
  email: string;
  username: string;
  password: string;
}

export interface SignUpVerifyResponse {
  result: UpdateResult;
  accessTokenCookie: string;
  refreshTokenCookie: {
    token: string;
    cookie: string;
  };
}

export interface SignUpVerifyParameters {
  email: string;
  emailCode: string;
}

export interface SignInParameters {
  email: string;
  password: string;
}

export interface SigInResponse {
  user: UserDto;
  accessTokenCookie: string;
  refreshTokenCookie: {
    token: string;
    cookie: string;
  };
}

export interface SignOutParameters {
  email: string;
}
