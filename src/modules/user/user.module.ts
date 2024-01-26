import { JwtModule, JwtService } from '../jwt';

import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule],
  providers: [UserService, JwtService],
})
export class UserModule {}
