import {
  CACHE_MANAGER,
  CacheModule as NestCacheModule,
} from '@nestjs/cache-manager';
import { Inject, Module } from '@nestjs/common';
import { RedisCache, redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { SocketSessionService } from '@src/socket-session/socket-session.service';
import { RedisTtl } from '@src/common/enums/redis-ttl.enum';

@Module({
  imports: [
    CustomConfigModule,
    NestCacheModule.registerAsync<RedisClientOptions>({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: async (dbConfigService: ConnectionConfigService) => {
        return {
          store: await redisStore({
            //'redis://172.17.208.1:6380'
            url: dbConfigService.getRedisSocketConnectionUrl(),
            ttl: RedisTtl.ONE_WEEK,
          }),
          socket: {
            keepAlive: 300,
          },
        };
      },
    }),
  ],
  providers: [SocketSessionService],
  exports: [SocketSessionService],
})
export class SocketSessionModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager: RedisCache) {
    const client = cacheManager.store.client;

    client.on('error', async (e) => {
      console.log(
        `Something went wrong with Redis Socket - ${new Date().toISOString()}`,
      );
      console.error(e);
    });
  }
}
