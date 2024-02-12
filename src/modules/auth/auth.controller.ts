import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() body: any) {
    const { cpf, password } = body;
    const result = this.authService.login(cpf, password);
    return result;
  }
}
