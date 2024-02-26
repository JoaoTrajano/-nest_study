import { Injectable } from '@nestjs/common';
import { MailerDTO } from './dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async send(config: MailerDTO) {
    const { to, from, subject, template, context } = config;

    return await this.mailer.sendMail({
      to,
      from,
      subject,
      template,
      context,
    });
  }
}
