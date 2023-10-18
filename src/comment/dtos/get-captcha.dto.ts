import { ApiProperty } from '@nestjs/swagger';

export class GetCaptchaDto {
  @ApiProperty({ type: String, example: '<svg>...</svg>' })
  captcha: string;
}
