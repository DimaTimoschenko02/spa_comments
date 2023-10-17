import { MappedCommentDto } from '@src/comment/dtos/mapped-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsResponseDto {
  @ApiProperty({ type: () => MappedCommentDto, isArray: true })
  comments: MappedCommentDto[];

  @ApiProperty({ type: Number, example: 10 })
  count: number;
}
