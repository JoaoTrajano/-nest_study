import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/helpers/Bcrypt';
import { MailModule } from '@modules/mail/mail.module';
import { Module } from '@nestjs/common';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserRepository } from '@database/typeorm';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MailModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [RecoverPasswordService, Bcrypt, UserRepository],
  exports: [RecoverPasswordService],
  controllers: [RecoverPasswordController],
})
export class RecoverPasswordModule {}
