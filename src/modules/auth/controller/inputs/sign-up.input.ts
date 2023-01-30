import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
