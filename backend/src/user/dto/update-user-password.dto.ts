import { IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateUserPasswordDTO {
  @IsUUID()
  @MaxLength(255)
  id: string;

  @IsString()
  @MaxLength(255)
  password: string;
}
