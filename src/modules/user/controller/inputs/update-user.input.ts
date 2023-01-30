import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  public username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  public password?: string;
}
