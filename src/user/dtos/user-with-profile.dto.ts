import { ApiProperty } from '@nestjs/swagger';

export class UserWithProfileDto {
  @ApiProperty({ type: String, example: 'someemail@gmail.com' })
  email: string;

  @ApiProperty({ type: String, example: 'Dima' })
  name: string;

  @ApiProperty({
    type: String,
    example:
      'https://s3.us-east-1.amazonaws.com/spa-comments1.0/png/ca84a4a4-7466-4e04-9ddb-d089ca31f5e1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&',
    nullable: true,
  })
  avatar?: string;
}
