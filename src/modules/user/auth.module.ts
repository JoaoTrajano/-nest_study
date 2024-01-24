import { JwtModule, JwtService } from '../jwt';

import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
