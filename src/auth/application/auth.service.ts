import { Injectable } from '@nestjs/common';

import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { SessionUseCase } from './use-cases/session.use-case';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly sessionUseCase: SessionUseCase,
  ) {}

  async register(body: RegisterUserDto) {
    return await this.registerUserUseCase.execute(body);
  }

  async logout(token: string) {
    await this.sessionUseCase.logout(token);
  }
}
