export interface CreateUserParameters {
  email: string;
  hashedPassword: string;
  emailCode: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface UpdateUserParameters {
  _id: number;
  email?: string;
  hashedPassword?: string;
  emailCode?: string;
}

export interface DeleteUserParameters {
  _id: number;
}

export interface SetCurrentRefreshTokenParameters {
  _id: number;
  currentHashedRefreshToken: string;
}

export interface VerifyUserParameters {
  _id: number;
}
