import { IsDate, IsString, IsUUID } from 'class-validator';

export class SessionUserDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;

  @IsDate()
  createdAt: string;

  @IsDate()
  expiresAt: string;
}
