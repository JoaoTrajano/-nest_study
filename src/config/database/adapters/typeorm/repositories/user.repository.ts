import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { Repository } from 'typeorm';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(data: UserEntity): UserEntity {
    return this.usersRepository.create(data);
  }
}
