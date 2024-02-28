import { UserEntity } from '../../entities';

export interface UserRepositoryInterface {
  create(data: UserEntity): UserEntity;
}
