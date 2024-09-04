import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ description: 'The password confirmation' })
  @IsString()
  @MinLength(6, { message: 'Password confirmation must be at least 6 characters long' })
  passwordConfirmation: string;
}
