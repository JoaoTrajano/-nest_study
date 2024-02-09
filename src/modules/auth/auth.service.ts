import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(
    cpf: string,
    password: string,
  ): Promise<{ token: string } | UnauthorizedException> {
    const user = await this.prismaService.users.findFirst({
      where: {
        cpf,
        password,
      },
    });

    if (!user) throw new UnauthorizedException('CPF ou SENHA inválidos!');

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
