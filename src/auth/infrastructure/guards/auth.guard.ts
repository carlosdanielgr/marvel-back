import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const session = await this.userRepository.findSessionByToken(token);
      if (!session || new Date() > session.expiresAt) {
        throw new UnauthorizedException('Token caducado o inválido');
      }
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }

    return true;
  }
}
