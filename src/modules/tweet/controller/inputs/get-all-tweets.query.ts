import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllTweetsQuery {
  @IsOptional()
  @IsNumberString()
  public offset?: string;

  @IsOptional()
  @IsNumberString()
  public limit?: string;

  @IsOptional()
  @IsString()
  public keyword?: string;
}
