import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { isNil } from 'lodash';
import { v4 } from 'uuid';

import { AwsS3ConfigService } from '@src/custom-config/aws-s3-config.service';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly signedUrlTtl: number;

  constructor(private readonly awsConfigService: AwsS3ConfigService) {
    const { options, bucketName } = awsConfigService.getConnectionOptions();

    this.s3 = new S3Client(options);
    this.bucketName = bucketName;
    this.signedUrlTtl = awsConfigService.getSignedUrlTtl();
  }

  public async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: this.signedUrlTtl,
    });
  }

  public async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.s3.send(command);
    } catch (err) {
      console.log({ err });
      throw new BadRequestException('Unable to delete resource');
    }
  }

  private async upload(
    file: Buffer,
    type: string,
    path: string,
    name?: string,
  ): Promise<string> {
    const fileName = !isNil(name) ? name : v4();

    const key = `${path}/${fileName}.${type}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
    });
    try {
      await this.s3.send(command);

      return key;
    } catch (err) {
      console.log({ err });
      throw new BadRequestException('Unable to save resource');
    }
  }
}
