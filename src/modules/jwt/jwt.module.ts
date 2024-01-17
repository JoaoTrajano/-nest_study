import { JwtModule as JwtModuleNest } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { Module } from '@nestjs/common';

Module({
  imports: [
    JwtModuleNest.register({
      secret: '$2a$12$d1DOJXx68d1VFYvxaWqj9.UvE7uVSxWi/NtajueXCrcHMfpqCtuwu',
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
});
export class JwtModule {}
