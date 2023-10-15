import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ type: String, example: 'some text' })
  @IsString()
  text: string;

  @ApiProperty({ type: String, example: 'https://google.com', nullable: true })
  @IsOptional()
  @IsUrl()
  homePage?: string;

  @ApiProperty({ type: () => PublicFileDto, isArray: true })
  @IsOptional()
  @IsArray()
  @Type(() => PublicFileDto)
  @ValidateNested({ each: true })
  files?: PublicFileDto[];
}
