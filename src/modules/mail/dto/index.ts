import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type MailerOptions = {
  to: string;
  from: string;
  subject: string;
  template: string;
  context?: any;
};

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
