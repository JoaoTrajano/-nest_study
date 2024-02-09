import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/config/database';
import { UserModule } from '../user';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '$2a$12$d1DOJXx68d1VFYvxaWqj9.UvE7uVSxWi/NtajueXCrcHMfpqCtuwu',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
