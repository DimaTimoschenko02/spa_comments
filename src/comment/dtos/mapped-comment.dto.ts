import { PublicFileKeyWithTypeDto } from '@src/public-file/dtos/public-file-key-with-type.dto';
import { UserWithProfileDto } from '@src/user/dtos/user-with-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MappedCommentDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Date, example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ type: String, example: 'https://google.com', nullable: true })
  homePage?: string;

  @ApiProperty({ type: Number, example: 1 })
  childCommentsCount: number;

  @ApiProperty({ type: () => PublicFileKeyWithTypeDto, isArray: true })
  files: PublicFileKeyWithTypeDto[];

  @ApiProperty({ type: () => UserWithProfileDto })
  user: UserWithProfileDto;
}
