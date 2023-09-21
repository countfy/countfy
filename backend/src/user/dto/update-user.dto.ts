import { IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateUserDTO {
  @IsUUID()
  @MaxLength(255)
  id: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(255)
  password: string;

  @IsString()
  @MaxLength(255)
  role: string;
}
