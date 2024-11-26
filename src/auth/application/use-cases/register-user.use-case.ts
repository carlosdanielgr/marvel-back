import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from 'src/auth/domain/entities/user.entity';
import { PasswordHasher } from 'src/auth/domain/domain-services/password-hasher.service';
import { RegisterUserDto } from 'src/auth/dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
  ) {}

  async execute(body: RegisterUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (existingUser) {
        throw new ConflictException('Ya se utiliza el correo electrónico');
      }
      const hashedPassword = await this.passwordHasher.hash(body.password);
      const user = this.userRepository.create({
        ...body,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      return {
        username: user.username,
        token: this.jwtService.sign({ id: user.id }),
      };
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
