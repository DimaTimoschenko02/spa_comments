import { BadRequestException } from '@nestjs/common';
import { availableCommentFormatsConst } from '@src/comment/consts/available-comment-formats.const';

export const commentFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  return availableCommentFormatsConst.includes(file.mimetype)
    ? callback(null, true)
    : callback(
        new BadRequestException(`${file.mimetype} format is unsupported`),
        false,
      );
};
