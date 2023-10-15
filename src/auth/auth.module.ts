import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { AuthController } from '@src/auth/auth.controller';
import { UserModule } from '@src/user/user.module';
import { JwtAuthStrategy } from '@src/auth/strategies/jwt-auth.strategy';
import { AuthService } from '@src/auth/auth.service';
import { TokenJwtModule } from '@src/token-jwt/token-jwt.module';
import { RefreshTokenStrategy } from '@src/auth/strategies/jwt-refresh-auth.strategy';

@Module({
  imports: [
    CustomConfigModule,
    JwtModule.register({}),
    UserModule,
    TokenJwtModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthStrategy, RefreshTokenStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
