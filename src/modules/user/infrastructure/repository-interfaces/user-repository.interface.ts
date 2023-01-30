export interface CreateParameters {
  email: string;
  username: string;
  hashedPassword: string;
  emailCode: string;
}

export interface GetByEmailParameters {
  email: string;
}

export interface GetByIdParameters {
  _id: string;
}

export interface UpdateParameters {
  _id: string;
  email?: string;
  username?: string;
  avatarURL?: string;
  hashedPassword?: string;
  emailCode?: string;
  description?: string;
}

export interface DeleteParameters {
  _id: string;
}

export interface SetRefreshTokenParameters {
  _id: string;
  currentHashedRefreshToken: string;
}

export interface VerifyParameters {
  _id: string;
}

export interface RemoveRefreshTokenParameters {
  _id: string;
}
