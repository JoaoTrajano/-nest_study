import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt';
import { PrismaService } from 'src/config/database';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  logout() {
    // return this.jwtService.verify();
  }
}
