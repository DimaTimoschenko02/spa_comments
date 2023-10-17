import { ApiProperty } from '@nestjs/swagger';

export class ShortParentCommentInfoDto {
  @ApiProperty({ type: Number, example: 2 })
  id: number;

  @ApiProperty({ type: String, example: 'any text' })
  text: string;

  @ApiProperty({ type: Number, example: 4 })
  filesCount: number;
}
