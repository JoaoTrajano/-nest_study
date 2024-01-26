import { JwtModule as JwtModuleNest, JwtService } from '@nestjs/jwt';

import { JwtServiceAuthenticate } from './jwt.service';
import { Module } from '@nestjs/common';

Module({
  imports: [
    JwtModuleNest.register({
      secret: '$2a$12$d1DOJXx68d1VFYvxaWqj9.UvE7uVSxWi/NtajueXCrcHMfpqCtuwu',
    }),
  ],
  providers: [JwtService],
  exports: [JwtServiceAuthenticate],
});
export class JwtModule {}
