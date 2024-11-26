import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  readonly password: string;
}
