import { IsEmail, IsNotEmpty } from 'class-validator';

export class DataForRecoverPassword {
  @IsEmail()
  @IsNotEmpty()
  email;
}

export class DataForUpdatePassword {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  newPassword: string;
}
