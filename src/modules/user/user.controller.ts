import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Users } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: Users) {
    const userCreated = await this.userService.create(user);
    if (!userCreated) throw new UnprocessableEntityException();
  }

  @Get()
  async fetch() {
    return this.userService.fetch();
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Users) {
    return this.userService.update(id, data);
  }
}
