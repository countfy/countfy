import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
}
