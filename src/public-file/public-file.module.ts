import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsS3Module } from '@src/aws-s3/aws-s3.module';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileRepository } from '@src/public-file/repositories/public-file.repository';
import { PublicFileService } from './public-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), AwsS3Module],
  providers: [PublicFileService, PublicFileRepository],
  exports: [PublicFileService],
})
export class PublicFileModule {}
