import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { Bcrypt } from 'src/entities/Bcrypt';
import { PrismaService } from 'src/config/database';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async login(
    cpf: string,
    password: string,
  ): Promise<{ token: string } | UnauthorizedException> {
    if (!cpf) throw new UnauthorizedException('CPF obrigatório!');
    if (!password) throw new UnauthorizedException('SENHA obrigatório!');

    const user = await this.prismaService.users.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) throw new UnauthorizedException('CPF/SENHA inválidos!');

    if (!(await this.bcrypt.verify(password, user.password)))
      throw new UnauthorizedException('CPF/SENHA inválidos!');

    const token = await this.sign(user, { issuer: 'Auth' });

    return { token };
  }

  async sign(user: Users, options?: JwtSignOptions): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        issuer: 'Auth',
        ...options,
      },
    );
  }

  verify(token: string): number | boolean {
    try {
      const id: number = this.jwtService.verify(token).id;
      return id;
    } catch (error) {
      return false;
    }
  }

  logout() {
    // return this.jwtService.verify();
  }
}
