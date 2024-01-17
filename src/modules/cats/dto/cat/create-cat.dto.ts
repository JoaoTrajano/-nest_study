import { BaseDTO } from '../base.dto';

export class CreateCatDTO extends BaseDTO {
  name: string;
  age: string;
  breed: string;
}
