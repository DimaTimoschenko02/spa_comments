import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessRefreshTokensDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRlN2E5ZTgxMmFkZDEyYTQxMTY4ZjAiLCJwcm92aWRlciI6ImxvY2FsIiwiaWF0IjoxNjY2MDkwODk3LCJleHAiOjE2NjYwOTExOTd9.7maMV87SdQg2MgdI_YzeGxgFrxK8KlddqFH3wF9tmeQ',
  })
  @IsNotEmpty({ message: 'AccessTokenIsEmpty' })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRlN2E5ZTgxMmFkZDEyYTQxMTY4ZjAiLCJwcm92aWRlciI6ImxvY2FsIiwiaWF0IjoxNjY2MDkwODk3LCJleHAiOjE2NjYwOTExOTd9.7maMV87SdQg2MgdI_YzeGxgFrxK8KlddqFH3wF9tmeQ',
  })
  @IsNotEmpty({ message: 'RefreshTokenIsEmpty' })
  @IsString()
  refreshToken: string;
}
