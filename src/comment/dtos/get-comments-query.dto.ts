import { LimitOffsetDto } from '@src/common/dtos/limit-offset.dto';
import { CommentSortEnum } from '@src/comment/enums/comment-sort.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderByEnum } from '@src/common/enums/order-by.enum';

export class GetCommentsQueryDto extends LimitOffsetDto {
  @ApiProperty({ enum: CommentSortEnum, example: CommentSortEnum.EMAIL })
  @IsEnum(CommentSortEnum)
  sortBy: CommentSortEnum;

  @ApiProperty({ enum: OrderByEnum, example: OrderByEnum.ASC })
  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum;
}
