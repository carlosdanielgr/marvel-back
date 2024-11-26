import { Injectable } from '@nestjs/common';

import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { RegisterUserDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async register(body: RegisterUserDto) {
    return await this.registerUserUseCase.execute(body);
  }
}
