import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@src/user/repositories/user.repository';
import { User } from '@src/user/entities/user.entity';
import { CreateUserDto } from '@src/user/dtos/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { ProfileService } from '@src/profile/profile.service';

@Injectable()
export class UserService {
  private readonly saltRounds: number;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly customConfigService: CustomConfigService,
    private readonly profileService: ProfileService,
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
    console.log({ user });
    const isExistsUser = await this.getUserByEmail(user.email);

    if (isExistsUser)
      throw new BadRequestException('UserWithThisEmailAlreadyExists');

    const hashedPassword = this.hashPassword(user.password);

    const userProfile = await this.profileService.createProfile({
      name: userName,
    });

    await this.userRepository.save({
      ...user,
      password: hashedPassword,
      profile: userProfile,
    });

    return { message: 'UserSuccessfullySignedUp' };
  }

  public hashPassword(password: string): string {
    const salt = genSaltSync(+this.saltRounds);
    console.log({ password, salt });
    return hashSync(password, salt);
  }
}
