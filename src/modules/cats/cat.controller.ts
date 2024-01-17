import {
  Get,
  Param,
  Body,
  Put,
  Delete,
  Post,
  Controller,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDTO } from './dto/cat/create-cat.dto';
import { ValidationPipe } from 'src/validations';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  fetchAll() {
    throw new HttpException('teste', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  show(
    @Param('id', new ValidationPipe().transform('id', { type: 'param' }))
    id: number,
  ): string {
    const users = ['user'];
    return users[id];
  }

  @Get('query')
  find(@Query() query): string {
    const users = ['user'];
    return '';
  }

  @Post()
  create(@Body() body: CreateCatDTO) {
    return this.catService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateCatDTO): string {
    const users = ['user'];
    console.log(body);
    return users[id];
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    const users = ['user'];
    return users[id];
  }
}
