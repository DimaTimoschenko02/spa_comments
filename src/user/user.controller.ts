import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@src/user/user.service';
import { CreateUserBodyDto } from '@src/user/dtos/create-user-body.dto';

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
}
