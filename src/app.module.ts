import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CatModule } from './modules';
import { LoggerMiddleware } from './middlewares/common/logger.middleware';

@Module({
  imports: [CatModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
