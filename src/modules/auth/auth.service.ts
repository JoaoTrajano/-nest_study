import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Bcrypt } from 'src/entities/Bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/database';

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

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        issuer: 'Auth',
      },
    );

    return { token };
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
