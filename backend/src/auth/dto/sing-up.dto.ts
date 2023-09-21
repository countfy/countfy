import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SingUpDto {
  // name: string;
  // email: string;
  // password: string;
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    example: 'vycasnicolas@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({
    example: 'superS3cr3tP4ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
}
