import { AuthModule } from '../auth';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule],
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
