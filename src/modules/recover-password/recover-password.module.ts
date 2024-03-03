import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/helpers/Bcrypt';
import { MailModule } from '@modules/mail/mail.module';
import { Module } from '@nestjs/common';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import {
  RecoveryPasswordRepository,
  UserRepository,
} from '@database/typeorm/repositories';
import { RecoveryPasswordEntity } from './entities/recovery-password.entity';
import { UserEntity } from '@modules/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MailModule,
    TypeOrmModule.forFeature([RecoveryPasswordEntity, UserEntity]),
  ],
  providers: [
    RecoverPasswordService,
    Bcrypt,
    UserRepository,
    RecoveryPasswordRepository,
  ],
  exports: [RecoverPasswordService],
  controllers: [RecoverPasswordController],
})
export class RecoverPasswordModule {}
