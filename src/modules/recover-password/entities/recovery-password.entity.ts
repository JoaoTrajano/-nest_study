import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RecoveryPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number;

  @Column({
    unique: true,
  })
  token: string;

  @Column()
  validUntil: string;

  @Column('')
  checked: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
