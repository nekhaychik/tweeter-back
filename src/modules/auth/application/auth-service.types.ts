import { PrivacyInfo, UserDto } from 'src/core';
import { AccessTokenPayload } from '../core';

export interface MakeAccessTokenParameters {
  user: UserDto;
}

export interface MakeRefreshTokenInfoParameters {
  userId: string;
  privacyInfo: PrivacyInfo;
  fingerprint: any;
}

export interface RefreshTokenInfo {
  refreshTokenExpiresInSeconds: number;
  refreshToken: string;
}

export interface AccessTokenConfig {
  payload: AccessTokenPayload;
  options: {
    subject?: string;
    secret: string;
    expiresIn?: number;
  };
}

export interface SignUpParameters {
  email: string;
  username: string;
  password: string;
}

export interface SignUpVerifyParameters {
  email: string;
  emailCode: string;
  privacyInfo: PrivacyInfo;
  fingerprint: any;
}

export interface SuccessAuthResult {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  cookies: {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    maxAge?: number;
    secure: boolean;
  }[];
}

export interface SignInParameters {
  email: string;
  password: string;
  privacyInfo: PrivacyInfo;
  fingerprint: any;
}

export interface SignOutParameters {
  cookies: any;
  userId: string;
}
