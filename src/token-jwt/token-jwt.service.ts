import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { AccessRefreshTokens } from '@src/token-jwt/types/access-refresh-tokens.type';

@Injectable()
export class TokenJwtService {
  private readonly jwtSecret: string;
  private readonly jwtExpireTime: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshExpireTime: string;

  public constructor(
    private readonly customConfigService: CustomConfigService,
  ) {
    this.jwtSecret = this.customConfigService.get<string>('JWT_SECRET_KEY');
    this.jwtExpireTime = this.customConfigService.get<string>(
      'JWT_TOKEN_EXPIRE_TIME',
    );
    this.jwtRefreshSecret =
      this.customConfigService.get<string>('JWT_REFRESH_SECRET');
    this.jwtRefreshExpireTime = this.customConfigService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRE_TIME',
    );
  }

  public async getTokens(sub: string): Promise<AccessRefreshTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      sign(
        {
          sub,
        },
        this.jwtSecret,
        {
          expiresIn: this.jwtExpireTime,
        },
      ),
      sign(
        {
          sub,
        },
        this.jwtRefreshSecret,
        {
          expiresIn: this.jwtRefreshExpireTime,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public decodeToken(token: string): JwtPayload {
    try {
      return verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
