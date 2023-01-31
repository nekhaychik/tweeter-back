export interface GetCountOfUserActiveSessionsParameters {
  userId: string;
}

export interface DeleteAllUserSessionsParameters {
  userId: string;
}

export interface DeleteUserRefreshSessionParameters {
  userId: string;
  refreshToken: string;
}
