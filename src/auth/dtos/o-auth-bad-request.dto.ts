import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OAuthBadRequestDto {
  @ApiProperty({ type: Number, example: 400 })
  @IsNotEmpty()
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    type: String,
    example: 'this username already exist',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    type: String,
    example: 'Bad Request',
  })
  @IsNotEmpty()
  @IsString()
  error: string;
}
