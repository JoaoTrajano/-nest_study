import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Bcrypt } from 'src/entities/Bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/config/database';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, Bcrypt, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
