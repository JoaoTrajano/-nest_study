import { AuthModule, UserModule } from '@modules/index';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LoggerMiddleware } from './middlewares/common/logger.middleware';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
