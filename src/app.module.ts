import { AuthModule, UserModule } from '@modules/index';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/common/logger.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter.js';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.TTL),
        limit: Number(process.env.LIMIT),
      },
    ]),
    AuthModule,
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'jimmie29@ethereal.email',
          pass: '3jj2JaC9B5mJG8ze1J',
        },
      },
      defaults: {
        from: '"Wyse Systems" <margot.heidenreich80@ethereal.email>',
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
