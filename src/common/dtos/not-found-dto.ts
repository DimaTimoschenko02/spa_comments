import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDto {
  @ApiProperty({ type: Number, example: 404 })
  statusCode: 404;

  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  error: string;
}
