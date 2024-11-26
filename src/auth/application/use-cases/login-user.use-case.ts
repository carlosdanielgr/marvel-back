import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const result = await this.userRepository.findByEmail(email);

      if (!result)
        throw new UnauthorizedException(
          'Las credenciales no son válidas (email)',
        );

      if (!password)
        throw new UnauthorizedException(
          'Las credenciales no son válidas (contraseña)',
        );

      await this.userRepository.passwordCompare(password, result.password);

      const token = this.userRepository.getToken(result.id);

      return this.userRepository.sessionCreate(result, token);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      console.log(error);
      throw new InternalServerErrorException('Please check server logs');
    }
  }
}
