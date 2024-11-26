import { ConflictException, Injectable } from '@nestjs/common';

import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: RegisterUserDto) {
    try {
      const existingUser = await this.userRepository.findByEmail(body.email);

      if (existingUser) {
        throw new ConflictException('Ya se utiliza el correo electrónico');
      }

      const hashedPassword = await this.userRepository.hashPassword(
        body.password,
      );

      const user = await this.userRepository.createUser(body, hashedPassword);

      const token = this.userRepository.getToken(user.id);

      return await this.userRepository.sessionCreate(user, token);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(
        'Unexpected error during user registration: ' + error.message,
      );
    }
  }
}
