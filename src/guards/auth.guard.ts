import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from 'src/modules';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(context: ExecutionContext): boolean {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (this.authService.verify(authorization)) return true;

    throw new UnauthorizedException();
  }
}
