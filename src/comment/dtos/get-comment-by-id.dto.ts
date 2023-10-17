import { MappedCommentDto } from '@src/comment/dtos/mapped-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ShortParentCommentInfoDto } from '@src/comment/dtos/short-parent-comment-info.dto';

export class GetCommentByIdDto {
  @ApiProperty({ type: () => MappedCommentDto })
  comment: MappedCommentDto;

  @ApiProperty({ type: () => ShortParentCommentInfoDto })
  parentComment?: ShortParentCommentInfoDto;
}
