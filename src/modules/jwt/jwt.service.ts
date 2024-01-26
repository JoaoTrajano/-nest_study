import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';

@Injectable()
export class JwtServiceAuthenticate {
  constructor(private readonly jwtService: JwtService) {}

  async sign(user: Users) {
    return await this.jwtService.sign(String(user.id));
  }

  verify() {
    // return this.jwtServiceNest.verify();
  }
}
