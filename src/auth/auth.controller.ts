import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { SignInBodyDto } from '@src/auth/dtos/sign-in-body.dto';
import { AccessRefreshTokensDto } from '@src/auth/dtos/access-refresh-tokens.dto';
import { OAuthBadRequestDto } from '@src/auth/dtos/o-auth-bad-request.dto';
import { RefreshTokenGuard } from '@src/auth/guards/refresh-token.guard';
import { UserNotFoundDto } from '@src/auth/dtos/user-not-found.dto';
import { GetCurrentUserId } from '@src/common/decorators/get-current-user-id.decorator';
import { GetRefreshToken } from '@src/common/decorators/get-refresh-token.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiCreatedResponse({ type: AccessRefreshTokensDto })
  @ApiOkResponse({ type: AccessRefreshTokensDto })
  @ApiBadRequestResponse({ type: OAuthBadRequestDto })
  public async localSignIn(
    @Body() { user }: SignInBodyDto,
  ): Promise<AccessRefreshTokensDto> {
    return await this.authService.signIn(user);
  }

  @Patch('refresh-tokens')
  @UseGuards(RefreshTokenGuard)
  @ApiCreatedResponse({ type: AccessRefreshTokensDto })
  @ApiNotFoundResponse({ type: UserNotFoundDto })
  @ApiBearerAuth()
  public async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetRefreshToken() refreshToken: string,
  ): Promise<AccessRefreshTokensDto> {
    return await this.authService.refreshTokens(userId, refreshToken);
  }

  @Patch('log-out')
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async logOut(@GetCurrentUserId() userId: number): Promise<void> {
    await this.authService.logOut(userId);
  }
}
