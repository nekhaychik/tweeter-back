import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCommentInput {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public text?: string;
}
