import { JwtModule, JwtServiceAuthenticate } from '../jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtServiceAuthenticate, JwtService],
})
export class AuthModule {}
