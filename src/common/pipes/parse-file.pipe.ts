import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ParseFile implements PipeTransform {
  async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
    if (file === undefined) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (file.mimetype.startsWith('image/')) {
      const imageBuffer = await sharp(file.buffer).resize(320, 420).toBuffer();

      return { ...file, buffer: imageBuffer };
    }

    if (file.buffer.length <= 100000) return file;

    throw new BadRequestException('Text file exceeds 100KB limit');
  }
}
