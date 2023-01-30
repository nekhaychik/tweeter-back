export interface GetUserIfRefreshTokenMatchesParameters {
  refreshToken: string;
  email: string;
}

export interface CreateUserParameters {
  email: string;
  username: string;
  password: string;
}

export interface SetCurrentRefreshTokenParameters {
  userId: string;
  refreshToken: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface GetUserByIdParameters {
  userId: string;
}

export interface DeleteUserParameters {
  userId: string;
}

export interface UpdateUserParameters {
  userId: string;
  email?: string;
  username?: string;
  password?: string;
  emailCode?: string;
}

export interface UpdateUserAvatarParameters {
  userId: string;
  file: Express.Multer.File;
}

export interface VerifyUserParameters {
  userId: string;
}

export interface RemoveRefreshTokenParameters {
  userId: string;
}
