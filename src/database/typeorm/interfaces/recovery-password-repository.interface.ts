import { FindOptionsWhere, UpdateResult } from 'typeorm';

import { RecoveryPasswordEntity } from '@modules/recover-password/entities/recovery-password.entity';

export interface RecoveryPasswordRepositoryInterface {
  create(data: RecoveryPasswordEntity): RecoveryPasswordEntity;
  update(id: number, data: RecoveryPasswordEntity): Promise<UpdateResult>;
  find(
    where: FindOptionsWhere<RecoveryPasswordEntity>,
  ): Promise<RecoveryPasswordEntity | null>;
}
