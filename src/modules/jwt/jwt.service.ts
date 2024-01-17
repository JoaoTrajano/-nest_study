import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceNest } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtServiceNest: JwtServiceNest) {}

  sign() {
    // return this.jwtServiceNest.sign()
  }

  verify() {
    // return this.jwtServiceNest.verify();
  }
}
