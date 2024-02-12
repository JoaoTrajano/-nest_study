import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
