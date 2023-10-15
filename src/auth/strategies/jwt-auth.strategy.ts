import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { has } from 'lodash';
import { EmailPayload } from '@src/auth/types/email-payload.type';
import { UserPayload } from '@src/auth/types/user-payload.type';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  public validate(
    payload: UserPayload | EmailPayload,
  ): UserPayload | EmailPayload {
    if (has(payload, 'sub') || has(payload, 'email')) return payload;

    throw new UnauthorizedException();
  }
}
