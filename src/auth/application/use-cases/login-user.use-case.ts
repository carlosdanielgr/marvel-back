import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { PasswordHasher } from 'src/auth/domain/domain-services/password-hasher.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User } from 'src/auth/domain/entities/user.entity';
import { SessionUseCase } from './session.use-case';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly sessionUseCase: SessionUseCase,
  ) {}

  async execute(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const result = await this.userRepository.findOne({
        where: { email },
        select: ['email', 'password', 'username'],
      });

      if (!result)
        throw new UnauthorizedException(
          'Las credenciales no son válidas (email)',
        );

      if (!password)
        throw new UnauthorizedException(
          'Las credenciales no son válidas (contraseña)',
        );

      const passwordCompare = await this.passwordHasher.compare(
        password,
        result.password,
      );
      if (!passwordCompare)
        throw new UnauthorizedException(
          'Las credenciales no son válidas (contraseña)',
        );

      const token = this.jwtService.sign({ id: result.id });
      await this.sessionUseCase.create(result, token);
      return {
        user: {
          email: result.email,
          username: result.username,
        },
        token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      console.log(error);
      throw new InternalServerErrorException('Please check server logs');
    }
  }
}
