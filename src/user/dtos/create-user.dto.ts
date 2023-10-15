import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'someemail@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'Password1234!' }) //TODO add regexp for password
  @IsString()
  password: string;

  @ApiProperty({ type: String, example: 'Dima' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  userName: string;
}
