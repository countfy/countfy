import { IsDate, IsString, IsUUID, MaxLength } from 'class-validator';

export class UserDTO {
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

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
