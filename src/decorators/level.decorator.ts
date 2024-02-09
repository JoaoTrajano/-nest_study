import { Reflector } from '@nestjs/core';

export const Levels = Reflector.createDecorator<string[]>();
