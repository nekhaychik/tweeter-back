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

export interface _WipeAllUserRefreshSessionsParameters {
  userId: string;
}
