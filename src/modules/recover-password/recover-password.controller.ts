import { Body, Controller, Post } from '@nestjs/common';
import { DataForRecoverPassword, DataForUpdatePassword } from './dto';
import { RecoverPasswordService } from './recover-password.service';

@Controller('recovery')
export class RecoverPasswordController {
  constructor(
    private readonly recoverPasswordService: RecoverPasswordService,
  ) {}
  @Post('/send-email')
  async recoverPassword(@Body() { email }: DataForRecoverPassword) {
    return await this.recoverPasswordService.sendEmailToRecoveryPassword(email);
  }

  @Post('/update-password')
  async updatePassword(@Body() { token, newPassword }: DataForUpdatePassword) {
    return await this.recoverPasswordService.updatePassword(token, newPassword);
  }
}
