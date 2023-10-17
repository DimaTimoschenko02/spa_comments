import { PublicFileTypeEnum } from '@src/public-file/enums/public-file-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PublicFileKeyWithTypeDto {
  @ApiProperty({ enum: PublicFileTypeEnum, example: PublicFileTypeEnum.JPG })
  type: PublicFileTypeEnum;

  @ApiProperty({
    type: String,
    example:
      'https://s3.us-east-1.amazonaws.com/spa-comments1.0/png/63e60ce1-5914-42bf-b5ce-84902d28fe88.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X',
  })
  key: string;
}
