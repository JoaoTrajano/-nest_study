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
    email: string,
    password: string,
  ): Promise<string | UnauthorizedException> {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
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
