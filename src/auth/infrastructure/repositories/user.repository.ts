import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from 'src/auth/domain/entities/user.entity';
import { SessionUseCase } from 'src/auth/application/use-cases/session.use-case';
import { PasswordHasher } from 'src/auth/domain/domain-services/password-hasher.service';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly sessionUseCase: SessionUseCase,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async passwordCompare(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const passwordCompare = await this.passwordHasher.compare(
      password,
      hashedPassword,
    );
    if (!passwordCompare)
      throw new UnauthorizedException(
        'Las credenciales no son válidas (contraseña)',
      );
  }

  async hashPassword(password: string): Promise<string> {
    return await this.passwordHasher.hash(password);
  }

  async createUser(
    body: RegisterUserDto,
    hashedPassword: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }

  async sessionCreate(user: User, token: string) {
    delete user.password;
    await this.sessionUseCase.create(user, token);
    return {
      ...user,
      token,
    };
  }

  async findSessionByToken(token: string) {
    return await this.sessionUseCase.findSessionByToken(token);
  }

  getToken(id: string): string {
    return this.jwtService.sign({ id });
  }
}
