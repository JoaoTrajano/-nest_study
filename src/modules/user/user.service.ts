import { UserRepository } from 'src/database';

import { Bcrypt } from 'src/helpers/Bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly bcrypt: Bcrypt,
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: UserEntity): Promise<UserEntity | boolean> {
    const encryptedPassword = await this.bcrypt.create(user.password);
    if (!encryptedPassword) throw new ExceptionsHandler();

    user.password = String(encryptedPassword);

    const userCreated = this.userRepository.create(user);
    if (!userCreated) return false;
    return userCreated;
  }

  async fetch(): Promise<UserEntity[]> {
    const users = await this.userRepository.fetchAll();
    return users;
  }

  async show(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.show(id);
    return user ? user : null;
  }

  async delete(id: number): Promise<UserEntity | boolean> {
    const user = await this.show(id);
    if (!user) return false;

    await this.userRepository.delete(user);
    return user;
  }

  async update(id: number, data: UserEntity): Promise<UpdateResult | boolean> {
    const user = await this.show(id);
    if (!user) return false;

    const userUpdated = await this.userRepository.update(user.id, data);
    return userUpdated;
  }

  async findByPasswordAndCpf(
    password: string,
    cpf: string,
  ): Promise<UserEntity | null> {
    const user = this.userRepository.find({
      password,
      cpf,
    });

    return user ? user : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.userRepository.find({
      email,
    });

    return user ? user : null;
  }
}
