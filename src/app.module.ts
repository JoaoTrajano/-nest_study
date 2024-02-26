import { AuthModule, MailModule, UserModule } from '@modules/index';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/common/logger.middleware';
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
    MailModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
