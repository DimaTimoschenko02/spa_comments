import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { ProfileService } from '@src/profile/profile.service';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
