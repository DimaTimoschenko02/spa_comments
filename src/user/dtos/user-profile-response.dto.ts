import { UserWithProfileDto } from '@src/user/dtos/user-with-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({ type: () => UserWithProfileDto })
  user: UserWithProfileDto;
}
