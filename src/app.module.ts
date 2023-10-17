import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';
import { CommentModule } from '@src/comment/comment.module';
import { ProfileModule } from '@src/profile/profile.module';
import { SocketSessionModule } from '@src/socket-session/socket-session.module';
import { AppGateway } from '@src/app.gateway';
import { SocketModule } from '@src/socket/socket.module';
import { TokenJwtModule } from '@src/token-jwt/token-jwt.module';
import { AwsS3Module } from '@src/aws-s3/aws-s3.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    CommentModule,
    ProfileModule,
    AwsS3Module,
    SocketModule,
    SocketSessionModule,
    TokenJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
