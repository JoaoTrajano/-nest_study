import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  logout() {
    // return this.jwtService.verify();
  }
}
