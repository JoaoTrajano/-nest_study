import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/entities/Bcrypt';
import { MailModule } from '@modules/mail/mail.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [UserModule, AuthModule, MailModule],
  providers: [RecoverPasswordService, Bcrypt, PrismaService],
  exports: [RecoverPasswordService],
  controllers: [RecoverPasswordController],
})
export class RecoverPasswordModule {}
