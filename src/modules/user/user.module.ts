import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
})
export class UserModule {}
