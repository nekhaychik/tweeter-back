export interface CreateParameters {
  email: string;
  hashedPassword: string;
  emailCode: string;
}

export interface GetByEmailParameters {
  email: string;
}

export interface UpdateParameters {
  _id: number;
  email?: string;
  hashedPassword?: string;
  emailCode?: string;
}

export interface DeleteParameters {
  _id: number;
}

export interface SetRefreshTokenParameters {
  _id: number;
  currentHashedRefreshToken: string;
}

export interface VerifyParameters {
  _id: number;
}

export interface RemoveRefreshTokenParameters {
  _id: number;
}
