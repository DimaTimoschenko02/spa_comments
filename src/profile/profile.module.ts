import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { ProfileService } from '@src/profile/profile.service';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';
import { PublicFileModule } from '@src/public-file/public-file.module';
import { ProfileController } from '@src/profile/profile.controller';
import { CacheModule } from '@src/cache/cache.module';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PublicFileModule,
    CacheModule,
    forwardRef(() => UserModule),
  ],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
