import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateCommentDto } from '@src/comment/dtos/create-comment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends OmitType(CreateCommentDto, ['text']) {
  @ApiProperty({ type: String, example: 'some text', nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}
