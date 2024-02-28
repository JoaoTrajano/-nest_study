import { Module, forwardRef } from '@nestjs/common';
import { UserEntity, UserRepository } from 'src/config/database';

import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/entities/Bcrypt';
import { FileModule } from '@modules/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    FileModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, Bcrypt, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
