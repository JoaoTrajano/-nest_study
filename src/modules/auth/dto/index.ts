import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  password: string;
}
