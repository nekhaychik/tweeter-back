export interface UserDto {
  _id: number;
  email: string;
  hashedPassword: string;
  emailCode: string;
  currentHashedRefreshToken?: string;
  isVerified?: boolean;
}
