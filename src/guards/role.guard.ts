import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(Role, context.getHandler());

    if (!role) return true;

    const request = context.switchToHttp().getRequest();

    return this.matchRoles(role, request.user.level);
  }

  matchRoles(role: string[], level: string) {
    if (role.includes(level)) {
      return true;
    }

    return false;
  }
}
