import { Injectable } from '@nestjs/common';
import { S3ClientConfig } from '@aws-sdk/client-s3';

import { CustomConfigService } from '@src/custom-config/custom-config.service';

@Injectable()
export class AwsS3ConfigService {
  private readonly options: S3ClientConfig;
  private readonly bucketName: string;
  private readonly signedUrlTtl: number;

  constructor(private readonly configService: CustomConfigService) {
    this.bucketName = configService.get<string>('AWS_BUCKET_NAME');

    const region = configService.get<string>('AWS_REGION');
    const accessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = configService.get<string>('AWS_SECRET_ACCESS_KEY');

    this.options = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    this.signedUrlTtl = Number(configService.get<string>('AWS_SIGNED_URL_TTL'));
  }

  public getConnectionOptions(): {
    options: S3ClientConfig;
    bucketName: string;
  } {
    return {
      options: this.options,
      bucketName: this.bucketName,
    };
  }

  public getSignedUrlTtl(): number {
    return this.signedUrlTtl;
  }
}
