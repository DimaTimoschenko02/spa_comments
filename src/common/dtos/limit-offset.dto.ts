import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class LimitOffsetDto {
  @ApiProperty({ type: Number, example: 25 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit: number = 25;

  @ApiProperty({ type: Number, example: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;
}
