import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserRepositoryInterface } from '../interfaces';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(data: UserEntity): UserEntity {
    return this.usersRepository.create(data);
  }

  async fetchAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async show(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return user;
  }

  async delete(user: UserEntity): Promise<DeleteResult | boolean> {
    return await this.usersRepository.delete(user);
  }

  async update(id: number, data: UserEntity): Promise<UpdateResult> {
    return await this.usersRepository.update(id, data);
  }

  async find(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOneBy({
      ...where,
    });
    if (!user) return null;

    return user;
  }
}
