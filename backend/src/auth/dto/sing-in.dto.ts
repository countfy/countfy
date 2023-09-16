import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SingInDto {
  @ApiProperty({
    example: 'teste@email.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
