import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt-adapter';
import { User } from './domain/entities/user.entity';
import { Session } from './domain/entities/session.entity';
import { AuthService } from './application/auth.service';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { SessionUseCase } from './application/use-cases/session.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUserUseCase,
    SessionUseCase,
    LoginUserUseCase,
    { provide: 'PasswordHasher', useClass: BcryptAdapter },
  ],
})
export class AuthModule {}
