import { AuthService } from './auth.service';
import { JwtModule } from '../jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule],
  providers: [AuthService],
})
export class AuthModule {}
