import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserNotFoundDto {
  @ApiProperty({ type: Number, example: 404 })
  @IsNotEmpty()
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    type: String,
    example: 'UserNotFound',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  @IsNotEmpty()
  @IsString()
  error: string;
}
