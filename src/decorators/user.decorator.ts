import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (field) return user[field];

    return user;
  },
);
