import { BadRequestException } from '@nestjs/common';
import { availableAvatarFormats } from '@src/profile/const/available-avatar-formats.const';

export const avatarFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  return availableAvatarFormats.includes(file.mimetype)
    ? callback(null, true)
    : callback(
        new BadRequestException(`${file.mimetype} format is unsupported`),
        false,
      );
};
