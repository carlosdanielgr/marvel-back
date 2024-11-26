import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Session } from 'src/auth/domain/entities/session.entity';
import { User } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class SessionUseCase {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(user: User, token: string): Promise<Session> {
    const session = this.sessionRepository.create({
      user,
      token,
      createdAt: new Date(),
      expiresAt: this.calculateExpiryDate(),
    });
    return await this.sessionRepository.save(session);
  }

  async logout(token: string) {
    await this.sessionRepository.delete({ token });
  }

  private calculateExpiryDate(): Date {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date;
  }
}
