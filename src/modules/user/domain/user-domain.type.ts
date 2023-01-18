export interface CreateUserParameters {
  email: string;
  hashedPassword: string;
  emailCode: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface UpdateUserParameters {
  userId: number;
  email?: string;
  hashedPassword?: string;
  emailCode?: string;
}

export interface DeleteUserParameters {
  userId: number;
}

export interface SetCurrentRefreshTokenParameters {
  userId: number;
  currentHashedRefreshToken: string;
}

export interface VerifyUserParameters {
  userId: number;
}

export interface RemoveRefreshTokenParameters {
  userId: number;
}
