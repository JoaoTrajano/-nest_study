import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceNest } from '@nestjs/jwt';
import { Users } from '@prisma/client';

@Injectable()
export class JwtService {
  constructor(private readonly jwtServiceNest: JwtServiceNest) {}

  async sign(user: Users) {
    return await this.jwtServiceNest.sign(String(user.id));
  }

  verify() {
    // return this.jwtServiceNest.verify();
  }
}
