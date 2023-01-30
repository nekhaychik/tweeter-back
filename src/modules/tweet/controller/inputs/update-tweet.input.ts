import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTweetInput {
  @IsOptional()
  @IsString()
  @MaxLength(700)
  public text?: string;

  @IsOptional()
  @IsBoolean()
  public isComment?: boolean;
}
