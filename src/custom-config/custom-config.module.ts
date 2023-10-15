import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { AwsS3ConfigService } from '@src/custom-config/aws-s3-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [CustomConfigService, ConnectionConfigService, AwsS3ConfigService],
  exports: [CustomConfigService, ConnectionConfigService, AwsS3ConfigService],
})
export class CustomConfigModule {}
