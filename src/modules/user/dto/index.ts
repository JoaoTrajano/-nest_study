import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  cpf: string;

  @IsNotEmpty()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
