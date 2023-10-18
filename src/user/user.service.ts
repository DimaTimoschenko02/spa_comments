import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@src/user/repositories/user.repository';
import { User } from '@src/user/entities/user.entity';
import { CreateUserDto } from '@src/user/dtos/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { ProfileService } from '@src/profile/profile.service';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { PublicFileService } from '@src/public-file/public-file.service';
import { UserProfileResponseDto } from '@src/user/dtos/user-profile-response.dto';
import { CacheService } from '@src/cache/cache.service';

@Injectable()
export class UserService {
  private readonly saltRounds: number;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly customConfigService: CustomConfigService,
    private readonly profileService: ProfileService,
    private readonly publicFileService: PublicFileService,
    private readonly cacheService: CacheService,
  ) {
    this.saltRounds = this.customConfigService.get<number>('SALT_ROUNDS');
  }

  public async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(id, { refreshToken });
  }

  public async deleteRefreshToken(id: number): Promise<void> {
    await this.userRepository.update(id, { refreshToken: null });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async createUser({
    userName,
    ...user
  }: CreateUserDto): Promise<{ message: string }> {
    const isExistsUser = await this.getUserByEmail(user.email);

    if (isExistsUser)
      throw new BadRequestException('UserWithThisEmailAlreadyExists');

    const hashedPassword = this.hashPassword(user.password);

    const userProfile = await this.profileService.createProfile({
      name: userName,
    });

    const newUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
      profile: userProfile,
    });

    this.getUserProfile(newUser.id).then();

    return { message: 'UserSuccessfullySignedUp' };
  }

  public async getUserProfile(id: number): Promise<UserProfileResponseDto> {
    const user = await this.isExistsUser(id, { profile: { avatar: true } });

    const userProfile = await this.cacheService.getUserProfile(id);
    console.log({ userProfile });
    if (userProfile) return userProfile;

    const mappedUser = {
      id: user.id,
      name: user.profile.name,
      email: user.email,
      avatar: user.profile.avatar
        ? await this.publicFileService.getFileLink(user.profile.avatar.key)
        : null,
    };

    this.cacheService.setUserProfile({ user: mappedUser }).then();

    return {
      user: mappedUser,
    };
  }

  public async isExistsUser(
    userId: number,
    relations?: FindOptionsRelations<User>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations,
    });

    if (isNil(user)) throw new NotFoundException('UserNotFound');

    return user;
  }

  public hashPassword(password: string): string {
    const salt = genSaltSync(+this.saltRounds);

    return hashSync(password, salt);
  }
}
