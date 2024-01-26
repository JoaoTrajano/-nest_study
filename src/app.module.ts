import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthModule } from './modules';
import { LoggerMiddleware } from './middlewares/common/logger.middleware';

@Module({
  imports: [AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
