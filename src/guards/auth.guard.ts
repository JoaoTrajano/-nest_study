import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const result = await this.authService.verify(authorization);
      if (!result) return false;

      const user = await this.userService.show(Number(result));
      request.user = user;

      return request;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
