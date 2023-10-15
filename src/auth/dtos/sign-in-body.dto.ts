import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { SignInDto } from '@src/auth/dtos/sign-in.dto';

export class SignInBodyDto {
  @ApiProperty({
    type: () => SignInDto,
    required: true,
  })
  @IsNotEmpty({ message: 'UserCanNotBeEmpty' })
  @IsNotEmptyObject()
  @Type(() => SignInDto)
  @ValidateNested()
  user: SignInDto;
}
