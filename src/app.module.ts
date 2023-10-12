import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';

@Module({
  imports: [CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
