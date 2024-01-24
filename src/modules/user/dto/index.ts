import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsEmail()
  login: string;

  @IsNotEmpty()
  password: string;
}
