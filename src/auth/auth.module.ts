import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './application/auth.service';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt-adapter';
import { User } from './domain/entities/user.entity';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
    { provide: 'PasswordHasher', useClass: BcryptAdapter },
  ],
})
export class AuthModule {}
