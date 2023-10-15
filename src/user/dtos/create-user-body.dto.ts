import { CreateUserDto } from '@src/user/dtos/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserBodyDto {
  @ApiProperty({ type: () => CreateUserDto, required: true })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
