import { UserEntity } from '@modules/user/entities/user.entity';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';

export interface UserRepositoryInterface {
  create(data: UserEntity): UserEntity;
  fetchAll(): Promise<UserEntity[]>;
  show(id: number): Promise<UserEntity>;
  delete(user: UserEntity): Promise<DeleteResult | boolean>;
  update(id: number, data: UserEntity): Promise<UpdateResult>;
  find(where: FindOptionsWhere<UserEntity>): Promise<UserEntity>;
}
