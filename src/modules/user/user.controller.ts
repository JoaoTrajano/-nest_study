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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Users } from '@prisma/client';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Role, User } from 'src/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@modules/file/file.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly file: FileService,
  ) {}

  @Post()
  @Role(['admin'])
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

  @Post('/account')
  async account(@User() user) {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/photo')
  async uploadPhoto(@User() user, @UploadedFile() photo) {
    console.log({ photo });
  }

  @Delete('/:id')
  @Role(['admin'])
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Users) {
    return this.userService.update(id, data);
  }
}
