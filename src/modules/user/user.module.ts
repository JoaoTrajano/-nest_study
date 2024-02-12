import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/entities/Bcrypt';
import { FileModule } from '@modules/file/file.module';
import { PrismaService } from 'src/config/database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [FileModule, forwardRef(() => AuthModule)],
  providers: [UserService, Bcrypt, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
