import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({ type: Number, example: 400 })
  statusCode: 400;

  @ApiProperty({
    type: String,
    example: 'Bad request',
  })
  error: string;
}
