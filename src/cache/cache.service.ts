import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheTtlEnum } from '@src/cache/enums/cache-ttl.enum';
import { UserProfileResponseDto } from '@src/user/dtos/user-profile-response.dto';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async setUserProfile(userProfile: UserProfileResponseDto) {
    const key = this.getUserProfileKey(userProfile.user.id);

    await this.saveData<UserProfileResponseDto>(
      key,
      userProfile,
      CacheTtlEnum.DAY,
    );
  }

  public async getUserProfile(userId: number): Promise<UserProfileResponseDto> {
    const key = this.getUserProfileKey(userId);

    return this.getDataByKey<UserProfileResponseDto>(key);
  }

  public async setUserCaptcha(userId: number, text: string) {
    const key = this.getCaptchaKey(userId);

    await this.saveData<string>(key, text, CacheTtlEnum.TEN_MINUTES);
  }

  public async getUserCaptcha(userId: number): Promise<string> {
    const key = this.getUserProfileKey(userId);

    return this.getDataByKey<string>(key);
  }

  private getUserProfileKey(userId: number) {
    return `user-profile-${userId}`;
  }

  private getCaptchaKey(userId: number) {
    return `user-captcha-${userId}`;
  }

  private async saveData<Value>(
    key: string,
    value: Value,
    ttl: number,
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  private async getDataByKey<Response>(
    key: string,
  ): Promise<Response | undefined> {
    return await this.cacheManager.get<Response>(key);
  }

  private async deleteDataByKey(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}
