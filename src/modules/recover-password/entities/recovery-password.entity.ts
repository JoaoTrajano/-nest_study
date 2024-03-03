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
  validUntil: Date;

  @Column({
    default: false,
  })
  checked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
