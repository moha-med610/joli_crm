import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { otpEmailTemp } from 'src/utils/mails/otpEmail.temp';
import { passwordEmailTemp } from 'src/utils/mails/passwordEmail.temp';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forget Password Verification Code',
      html: otpEmailTemp(otp),
    });
  }

  async sendPasswordEmail(email: string, name: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Company Password',
      html: passwordEmailTemp(name, password),
    });
  }
}
