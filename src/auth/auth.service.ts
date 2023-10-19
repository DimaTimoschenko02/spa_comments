import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isNil } from 'lodash';
import { compare, genSaltSync, hashSync } from 'bcrypt';

import { TokenJwtService } from '@src/token-jwt/token-jwt.service';
import { UserService } from '@src/user/user.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { User } from '@src/user/entities/user.entity';
import { SignInDto } from '@src/auth/dtos/sign-in.dto';
import { AccessRefreshTokensDto } from '@src/auth/dtos/access-refresh-tokens.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds: number;

  constructor(
    private readonly tokenJwtService: TokenJwtService,
    private readonly userService: UserService,
    private readonly customConfigService: CustomConfigService,
  ) {
    this.saltRounds = +this.customConfigService.get<number>('SALT_ROUNDS');
  }

  public async signIn({
    email,
    password,
  }: SignInDto): Promise<AccessRefreshTokensDto> {
    const existingUser = await this.userService.getUserByEmail(email);

    return await this.validateAndGetTokens(existingUser, password);
  }

  public async refreshTokens(userId: number, refreshTokenToUpdate: string) {
    const existingUser = await this.userService.getUserById(userId);

    if (isNil(existingUser)) throw new NotFoundException('UserNotFound');

    if (isNil(existingUser.refreshToken)) throw new UnauthorizedException();

    const checkingResponse = this.compareHashToInputValue(
      existingUser.refreshToken,
      refreshTokenToUpdate,
    );

    if (!checkingResponse) throw new BadRequestException('InvalidRefresh');

    const { accessToken, refreshToken } = await this.tokenJwtService.getTokens(
      existingUser.id.toString(),
    );

    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);

    await this.userService.updateRefreshToken(
      existingUser.id.toString(),
      hashedRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  public async logOut(userId: number): Promise<void> {
    await this.userService.deleteRefreshToken(userId);
  }

  private async validateAndGetTokens(
    user: User,
    password: string,
  ): Promise<AccessRefreshTokensDto> {
    const checkingResponse = await this.compareHashToInputValue(
      user.password,
      password,
    );

    if (!checkingResponse)
      throw new BadRequestException('IncorrectEmailOrPassword');

    const { accessToken, refreshToken } = await this.tokenJwtService.getTokens(
      user.id.toString(),
    );

    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);

    await this.userService.updateRefreshToken(
      user.id.toString(),
      hashedRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  private async hashRefreshToken(token: string): Promise<string> {
    const salt = genSaltSync(this.saltRounds);

    return hashSync(token, salt);
  }

  private async compareHashToInputValue(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}
