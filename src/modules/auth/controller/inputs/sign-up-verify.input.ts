import { IsEmail, IsString } from 'class-validator';

export class SignUpVerifyInput {
  @IsEmail()
  email: string;

  @IsString()
  emailCode: string;
}
