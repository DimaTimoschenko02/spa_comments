import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';
import { ProfileDto } from '@src/profile/dtos/profile.dto';
import { Profile } from '@src/profile/entities/profile.entity';
import { PublicFileService } from '@src/public-file/public-file.service';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { CacheService } from '@src/cache/cache.service';
import { UserService } from '@src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly publicFileService: PublicFileService,
    private readonly cacheService: CacheService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async createProfile(profile: ProfileDto): Promise<Profile> {
    return this.profileRepository.save(profile);
  }

  public async createAvatar(file: Express.Multer.File): Promise<PublicFile> {
    return this.publicFileService.uploadFile(file);
  }

  public async setAvatar(userId: number, avatar: PublicFileDto): Promise<void> {
    const [profile, file] = await Promise.all([
      this.profileRepository.findOne({ where: { user: { id: userId } } }),
      this.publicFileService.isExistsFile(avatar.id),
    ]);

    await this.profileRepository.update(profile.id, { avatar: file });

    this.userService.getUserProfile(userId).then();
  }
}
