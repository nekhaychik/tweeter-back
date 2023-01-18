import { UserEntity } from 'src/modules/user';
import { UpdateResult } from 'typeorm';

export interface GetCookieWithJwtAccessTokenParameters {
  userId: number;
}

export interface GetCookieWithJwtRefreshTokenParameters {
  userId: number;
}

export interface RefreshTokenCookie {
  cookie: string;
  token: string;
}

export interface SignUpParameters {
  email: string;
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
  user: UserEntity;
  accessTokenCookie: string;
  refreshTokenCookie: {
    token: string;
    cookie: string;
  };
}

export interface SignOutParameters {
  email: string;
}
