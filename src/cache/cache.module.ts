import { CacheModule as NestCacheModule } from '@nestjs/cache-manager/dist/cache.module';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

import { CacheService } from '@src/cache/cache.service';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    NestCacheModule.registerAsync<RedisClientOptions>({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: async (dbConfigService: ConnectionConfigService) => {
        return {
          store: await redisStore({
            url: dbConfigService.getRedisCacheConnectionUrl(),
          }),
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
