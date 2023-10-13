import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CustomConfigService } from './custom-config.service';
import * as DbMigrationsModule from './migrations';

const dbMigrations = Object.values(DbMigrationsModule);

@Injectable()
export class ConnectionConfigService {
  private readonly postgresConnectionOptions: TypeOrmModuleOptions;

  private readonly redisCacheConnectionUrl: string;

  constructor(private readonly configService: CustomConfigService) {
    this.redisCacheConnectionUrl =
      this.configService.get<string>('REDIS_CACHE_URL');
    this.postgresConnectionOptions = {
      type: 'postgres',
      url: this.configService.get<string>('POSTGRES_URL'),
      entities: [],
      migrations: dbMigrations,
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
      logging: true,
    };
  }

  public getDbConnectionOption(): TypeOrmModuleOptions {
    return this.postgresConnectionOptions;
  }

  public getRedisCacheConnectionUrl(): string {
    return this.redisCacheConnectionUrl;
  }
}