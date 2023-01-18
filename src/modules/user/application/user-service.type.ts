export interface CreateUserParameters {
  email: string;
  password: string;
}

export interface SetCurrentRefreshTokenParameters {
  _id: number;
  refreshToken: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface DeleteUserParameters {
  _id: number;
}

export interface UpdateUserParameters {
  _id: number;
  email?: string;
  password?: string;
  emailCode?: string;
}

export interface VerifyUserParameters {
  _id: number;
}
