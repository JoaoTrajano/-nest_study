import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailerDTO {
  @IsEmail()
  to: string;

  @IsEmail()
  from: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  template: string;

  context?: any;
}
