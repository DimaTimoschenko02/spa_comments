import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@src/user/user.service';
import { CreateUserBodyDto } from '@src/user/dtos/create-user-body.dto';
import { IdDto } from '@src/common/dtos/id.dto';
import { UserProfileResponseDto } from '@src/user/dtos/user-profile-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  public async createUser(
    @Body() { user }: CreateUserBodyDto,
  ): Promise<{ message: string }> {
    return this.userService.createUser(user);
  }

  @Get('profile/:id')
  public async getUserProfile(
    @Param() { id }: IdDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.getUserProfile(id);
  }
}
