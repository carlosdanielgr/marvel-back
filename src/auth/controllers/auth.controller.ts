import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';

import { AuthService } from '../application/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: RegisterUserDto,
  ) {
    return await this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request): Promise<void> {
    const token = req.headers['authorization'];
    await this.authService.logout(token);
  }
}
