import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtServiceAuthenticate } from '../jwt';
import { PrismaService } from 'src/config/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtServiceAuthenticate,
    private readonly prismaService: PrismaService,
  ) {}

  async login(
    cpf: string,
    password: string,
  ): Promise<string | UnauthorizedException> {
    const user = await this.prismaService.users.findFirst({
      where: {
        cpf,
        password,
      },
    });

    if (!user) throw new UnauthorizedException('CPF ou SENHA inválidos!');

    const token = await this.jwtService.sign(user);
    return token;
  }

  logout() {
    // return this.jwtService.verify();
  }
}
