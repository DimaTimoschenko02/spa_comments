import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [CustomConfigService, ConnectionConfigService],
  exports: [CustomConfigService, ConnectionConfigService],
})
export class CustomConfigModule {}
