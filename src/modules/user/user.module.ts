import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { Bcrypt } from 'src/helpers/Bcrypt';
import { FileModule } from '@modules/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from '@database/typeorm/repositories';

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
