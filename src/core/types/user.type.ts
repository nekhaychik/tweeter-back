export interface UserDto {
  _id: string;
  email: string;
  username: string;
  avatarURL?: string;
  hashedPassword: string;
  emailCode: string;
  currentHashedRefreshToken?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  description?: string;
}
