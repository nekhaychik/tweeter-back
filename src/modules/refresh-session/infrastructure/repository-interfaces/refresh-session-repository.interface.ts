import { RefreshSessionDto } from '../entities';

export interface AddRefreshSessionParameters {
  refreshSession: RefreshSessionDto;
}

export interface _IsValidSessionsCountParameters {
  userId: string;
}

export interface _AddRefreshSessionParameters {
  refreshSession: RefreshSessionDto;
}

export interface GetCountOfUserActiveSessionsParameters {
  userId: string;
}

export interface RemoveRefreshSessionParameteres {
  refreshToken: string;
  userId: string;
}

export interface WipeAllUserRefreshSessionsParameters {
  userId: string;
}

export interface _WipeOldestUserRefreshSessionParameters {
  userId: string;
}
