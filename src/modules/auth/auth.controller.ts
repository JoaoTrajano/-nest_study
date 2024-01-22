import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginDTO) {
    const { email, password } = body;

    const result = this.authService.login(email, password);
    return result;
  }
}
