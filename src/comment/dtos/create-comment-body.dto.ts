import { CreateCommentDto } from '@src/comment/dtos/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentBodyDto {
  @ApiProperty({ type: () => CreateCommentDto })
  @IsNotEmptyObject()
  @Type(() => CreateCommentDto)
  @ValidateNested()
  comment: CreateCommentDto;
}
