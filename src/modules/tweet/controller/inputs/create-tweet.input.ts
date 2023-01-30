import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTweetInput {
  @IsBoolean()
  public isComment: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  public text?: string;
}
