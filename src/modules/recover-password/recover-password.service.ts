import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Bcrypt } from 'src/helpers/Bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { MailService } from '@modules/mail/mail.service';
import { addMinutes } from 'date-fns';
import { UserEntity } from '@modules/user/entities/user.entity';
import {
  UserRepository,
  RecoveryPasswordRepository,
} from '@database/typeorm/repositories';

Injectable();
export class RecoverPasswordService {
  @Inject(UserRepository)
  private readonly userService: UserRepository;

  @Inject(RecoveryPasswordRepository)
  private readonly recoveryPasswordRepository: RecoveryPasswordRepository;

  @Inject(MailService)
  private readonly mailer: MailService;

  @Inject(Bcrypt)
  private readonly bcrypt: Bcrypt;

  private expiriesIn: number;

  constructor() {
    this.expiriesIn = Number(process.env.TIME_EXPIRES);
  }

  async sendEmailToRecoveryPassword(email: string) {
    const user = await this.userService.find({
      email,
    });
    if (!user) throw new ExceptionsHandler();
    const accessLinkRecoverPassword =
      await this.generateAccessLinkRecoverPassword(user);
    try {
      return await this.mailer.send({
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: 'Recuperação de Senha',
        template: 'forget',
        context: {
          name: user.name,
          link: accessLinkRecoverPassword,
        },
      });
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }

  async updatePassword(token: string, newPassword: string) {
    const currentDateTime = new Date();
    const fiveMinutesFromNow = addMinutes(currentDateTime, this.expiriesIn);

    try {
      const obtainedToken = await this.recoveryPasswordRepository.find({
        where: {
          token,
        },
      });

      if (!obtainedToken || obtainedToken.checked)
        throw new UnauthorizedException('Link de recuperação não é válido');

      // const { user } = obtainedToken;
      // user.password = String(await this.bcrypt.create(newPassword));
      // await this.userService.update(user.id, user);
      // obtainedToken.checked = true;
      // await this.userRepository.update(obtainedToken.id, { checked: true });
    } catch (error) {
      throw new UnauthorizedException('Link de recuperação não é válido');
    }
  }

  private async createTokenForRecoveryPassword(
    user: UserEntity,
  ): Promise<string | UnauthorizedException> {
    const token = String(await this.bcrypt.create(user.cpf));

    try {
      const validUntil = new Date();
      validUntil.setMinutes(validUntil.getMinutes() + this.expiriesIn);

      await this.recoveryPasswordRepository.create({
        token,
        idUser: user.id,
        validUntil,
      });
      return token;
    } catch (error) {
      throw new UnauthorizedException('Link de recuperação não é válido');
    }
  }

  private async generateAccessLinkRecoverPassword(
    user: UserEntity,
  ): Promise<string> {
    const token = await this.createTokenForRecoveryPassword(user);
    return `http://localhost:3000/recover-password?key=${token}`;
  }
}
