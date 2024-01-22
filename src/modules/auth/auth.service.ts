import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  login(email: string, password: string) {
    // return this.jwtService.sign()
  }

  logout() {
    // return this.jwtService.verify();
  }
}
