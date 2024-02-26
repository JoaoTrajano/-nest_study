import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      },
      defaults: {
        from: `'${process.env.FROM_USER}" <${process.env.FROM_EMAIL}>'`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
