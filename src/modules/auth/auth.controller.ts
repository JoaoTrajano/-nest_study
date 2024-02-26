import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailer: MailerService,
  ) {}

  @Post('')
  async login(@Body() body: LoginDTO) {
    const { cpf, password } = body;
    const result = this.authService.login(cpf, password);
    return result;
  }

  @Post('/forget-password')
  async forgetPassword() {
    const result = await this.mailer.sendMail({
      subject: 'Teste de envio',
      to: 'joao.trajanosouza@gmail.com',
      template: 'forget',
      context: {
        name: 'João',
      },
    });
    return result;
  }
}
