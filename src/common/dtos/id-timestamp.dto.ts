import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class WithIdAndTimestampDto {
  @ApiProperty({ example: 1, type: Number })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ example: '2023-07-12T10:30:00Z', type: Date })
  @IsOptional()
  @IsDateString({})
  createdAt?: Date;

  @ApiProperty({ example: '2023-07-12T15:45:00Z', type: Date })
  @IsOptional()
  @IsDateString({})
  updatedAt?: Date;
}
