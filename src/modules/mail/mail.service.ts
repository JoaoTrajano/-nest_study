import { Injectable } from '@nestjs/common';
import { MailerOptions } from './dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async send(options: MailerOptions) {
    return await this.mailer.sendMail({
      ...options,
    });
  }
}
