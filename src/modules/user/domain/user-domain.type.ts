export interface CreateUserParameters {
  email: string;
  username: string;
  hashedPassword: string;
  emailCode: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface GetUserByIdParameters {
  userId: string;
}

export interface UpdateUserParameters {
  userId: string;
  email?: string;
  username?: string;
  avatarURL?: string;
  hashedPassword?: string;
  emailCode?: string;
  description?: string;
}

export interface DeleteUserParameters {
  userId: string;
}

export interface SetCurrentRefreshTokenParameters {
  userId: string;
  currentHashedRefreshToken: string;
}

export interface VerifyUserParameters {
  userId: string;
}

export interface RemoveRefreshTokenParameters {
  userId: string;
}
