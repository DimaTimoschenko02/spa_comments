import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';
import { ProfileDto } from '@src/profile/dtos/profile.dto';
import { Profile } from '@src/profile/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async createProfile(profile: ProfileDto): Promise<Profile> {
    return this.profileRepository.save(profile);
  }
}
