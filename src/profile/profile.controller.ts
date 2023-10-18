import {
  Body,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from '@src/profile/profile.service';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { GetCurrentUserId } from '@src/common/decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { SetAvatarDto } from '@src/profile/dtos/set-avatar.dto';
import { ParseFile } from '@src/common/pipes/parse-file.pipe';
import { avatarFileFilter } from '@src/common/utils/avatar-file-filter.util';

@ApiTags('Profile')
@Controller('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('avatar')
  @ApiOkResponse({ type: PublicFileDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar', { fileFilter: avatarFileFilter }))
  public async createFile(
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ): Promise<PublicFile> {
    return this.profileService.createAvatar(file);
  }

  @Patch('avatar')
  public async setAvatar(
    @Body() { avatar }: SetAvatarDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    return this.profileService.setAvatar(userId, avatar);
  }
}
