import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PublicFileTypeEnum } from '@src/public-file/enums/public-file-type.enum';
import { WithIdAndTimestampDto } from '@src/common/dtos/id-timestamp.dto';

export class PublicFileDto extends WithIdAndTimestampDto {
  @ApiProperty({
    type: String,
    example: 'jwn2njkjtn32fnk23ntk23ntk23',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  key: string;

  @ApiProperty({
    enum: PublicFileTypeEnum,
    example: PublicFileTypeEnum.JPG,
  })
  @IsEnum(PublicFileTypeEnum)
  type: PublicFileTypeEnum;
}
