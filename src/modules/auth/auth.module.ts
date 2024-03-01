import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Bcrypt } from 'src/helpers/Bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@modules/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserRepository } from '@database/typeorm';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    MailModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, Bcrypt],
  exports: [AuthService],
})
export class AuthModule {}
