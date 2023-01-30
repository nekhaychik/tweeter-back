import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  public username: string;

  @IsString()
  @MinLength(6)
  public password: string;
}
