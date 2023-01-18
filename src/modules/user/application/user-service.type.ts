export interface GetUserIfRefreshTokenMatchesParameters {
  refreshToken: string;
  email: string;
}

export interface CreateUserParameters {
  email: string;
  password: string;
}

export interface SetCurrentRefreshTokenParameters {
  userId: number;
  refreshToken: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface DeleteUserParameters {
  userId: number;
}

export interface UpdateUserParameters {
  userId: number;
  email?: string;
  password?: string;
  emailCode?: string;
}

export interface VerifyUserParameters {
  userId: number;
}

export interface RemoveRefreshTokenParameters {
  userId: number;
}
