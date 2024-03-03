import { InjectRepository } from '@nestjs/typeorm';
import { RecoveryPasswordRepositoryInterface } from '../interfaces';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { RecoveryPasswordEntity } from '@modules/recover-password/entities/recovery-password.entity';

export class RecoveryPasswordRepository
  implements RecoveryPasswordRepositoryInterface
{
  constructor(
    @InjectRepository(RecoveryPasswordEntity)
    private recoveryPasswordRepository: Repository<RecoveryPasswordEntity>,
  ) {}

  create(data: Partial<RecoveryPasswordEntity>): RecoveryPasswordEntity {
    return this.recoveryPasswordRepository.create(data);
  }

  async update(
    id: number,
    data: RecoveryPasswordEntity,
  ): Promise<UpdateResult> {
    return await this.recoveryPasswordRepository.update(id, data);
  }

  async find({
    where,
  }: {
    where: FindOptionsWhere<RecoveryPasswordEntity>;
  }): Promise<RecoveryPasswordEntity | null> {
    const user = await this.recoveryPasswordRepository.findOneBy({
      ...where,
    });

    if (!user) return null;

    return user;
  }
}
