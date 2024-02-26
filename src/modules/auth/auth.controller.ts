import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { MailService } from '@modules/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailer: MailService,
  ) {}

  @Post('')
  async login(@Body() body: LoginDTO) {
    const { cpf, password } = body;
    const result = this.authService.login(cpf, password);
    return result;
  }

  @Post('/forget-password')
  async forgetPassword() {
    const result = await this.mailer.send({
      to: 'joao.trajanosouza@gmail.com',
      from: 'teste@gmail.com',
      subject: 'teste de envio',
      template: 'forget',
      context: { name: 'João' },
    });
    return result;
  }
}
