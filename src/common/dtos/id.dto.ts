import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class IdDto {
  @ApiProperty({ type: Number, example: 1 })
  @Transform(({ value }) => Number(value))
  @IsNumber({})
  @IsPositive()
  id: number;
}
