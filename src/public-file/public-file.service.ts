import { Injectable, NotFoundException } from '@nestjs/common';
import { isNil } from 'lodash';

import { AwsS3Service } from '@src/aws-s3/aws-s3.service';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileTypeEnum } from '@src/public-file/enums/public-file-type.enum';
import { PublicFileRepository } from '@src/public-file/repositories/public-file.repository';

@Injectable()
export class PublicFileService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly publicFileRepository: PublicFileRepository,
  ) {}

  public async getFileLink(key: string): Promise<string> {
    return this.awsS3Service.getSignedUrl(key);
  }

  public async uploadFile(file: Express.Multer.File): Promise<PublicFile> {
    const fileType = file.mimetype.split('/')[1];

    const key = await this.awsS3Service.upload(file.buffer, fileType, fileType);

    return await this.publicFileRepository.createPublicFile(
      key,
      fileType as PublicFileTypeEnum,
    );
  }

  public async getFileById(id: number): Promise<PublicFile> {
    return this.publicFileRepository.findOne({ where: { id } });
  }

  public async isExistsFile(id: number): Promise<PublicFile> {
    const file = await this.getFileById(id);

    if (isNil(file)) throw new NotFoundException('FileNotFound');

    return file;
  }

  public async deletePublicFile(id: number): Promise<void> {
    const publicFile = await this.isExistsFile(id);

    await this.awsS3Service.deleteFile(publicFile.key);

    await this.publicFileRepository.delete(publicFile.id);
  }
}
