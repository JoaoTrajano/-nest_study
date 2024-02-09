import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth';
import { PrismaService } from 'src/config/database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
