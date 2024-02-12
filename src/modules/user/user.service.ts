import { Bcrypt } from 'src/entities/Bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database';
import { Users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async create(user: Users): Promise<Users | boolean> {
    const encryptedPassword = await this.bcrypt.create(user.password);
    if (!encryptedPassword) throw new ExceptionsHandler();

    user.password = String(encryptedPassword);

    const userCreated = await this.prismaService.users.create({ data: user });
    if (!userCreated) return false;
    return userCreated;
  }

  async fetch(): Promise<Users[]> {
    const users = await this.prismaService.users.findMany({});
    return users;
  }

  async show(id: number): Promise<Users | null> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
    return user ? user : null;
  }

  async delete(id: number): Promise<Users | boolean> {
    const user = await this.show(id);

    if (!user) return false;

    await this.prismaService.users.delete({
      where: {
        id: user.id,
      },
    });

    return user;
  }

  async update(id: number, data: Users): Promise<Users | boolean> {
    const user = await this.show(id);

    if (!user) return false;

    const userUpdated = await this.prismaService.users.update({
      where: {
        id: user.id,
      },
      data,
    });

    return userUpdated;
  }

  async findByPasswordAndCpf(
    password: string,
    cpf: string,
  ): Promise<Users | null> {
    const user = this.prismaService.users.findFirst({
      where: { password, cpf },
    });

    return user ? user : null;
  }
}
