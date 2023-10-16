import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

export class SetAvatarDto {
  @ApiProperty({ type: () => PublicFileDto })
  @Type(() => PublicFileDto)
  @IsNotEmptyObject()
  @ValidateNested()
  avatar: PublicFileDto;
}
