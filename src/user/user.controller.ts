import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '@src/user/user.service';
import { CreateUserBodyDto } from '@src/user/dtos/create-user-body.dto';
import { IdDto } from '@src/common/dtos/id.dto';
import { UserProfileResponseDto } from '@src/user/dtos/user-profile-response.dto';
import { BadRequestDto } from '@src/common/dtos/bad-request.dto';
import { NotFoundDto } from '@src/common/dtos/not-found-dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'UserWithThisEmailAlreadyExists',
  })
  public async createUser(@Body() { user }: CreateUserBodyDto): Promise<void> {
    return this.userService.createUser(user);
  }

  @Get('profile/:id')
  @ApiOkResponse({ type: UserProfileResponseDto })
  @ApiNotFoundResponse({ type: NotFoundDto, description: 'UserNotFound' })
  public async getUserProfile(
    @Param() { id }: IdDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.getUserProfile(id);
  }
}
