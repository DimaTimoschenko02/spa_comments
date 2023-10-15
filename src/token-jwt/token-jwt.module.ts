import { Module } from '@nestjs/common';

import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { TokenJwtService } from '@src/token-jwt/token-jwt.service';

@Module({
  imports: [CustomConfigModule],
  providers: [TokenJwtService],
  exports: [TokenJwtService],
})
export class TokenJwtModule {}
