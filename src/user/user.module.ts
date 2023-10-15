import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { UserRepository } from '@src/user/repositories/user.repository';
import { UserService } from '@src/user/user.service';
import { UserController } from '@src/user/user.controller';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { ProfileModule } from '@src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CustomConfigModule,
    ProfileModule,
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
