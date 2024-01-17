import { CreateCatDTO } from './dto/cat/create-cat.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  private readonly cats: CreateCatDTO[] = [];

  create(cat: CreateCatDTO): CreateCatDTO {
    this.cats.push(cat);
    return cat;
  }

  fetchAll(): CreateCatDTO[] {
    return this.cats;
  }
}
