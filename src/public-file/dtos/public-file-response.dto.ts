import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '@src/common/dtos/id.dto';

export class PublicFileResponseDto extends IdDto {
  @ApiProperty({ type: String, example: 'https://aws.com/key' })
  key: string;
}
