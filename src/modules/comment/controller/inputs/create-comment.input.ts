import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentInput {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public text?: string;
}
