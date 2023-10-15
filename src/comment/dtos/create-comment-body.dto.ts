import { CreateCommentDto } from '@src/comment/dtos/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentBodyDto {
  @ApiProperty({ type: () => CreateCommentDto })
  @IsNotEmptyObject()
  @Type(() => CreateCommentDto)
  @ValidateNested()
  comment: CreateCommentDto;

  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  parentCommentId?: number;
}
