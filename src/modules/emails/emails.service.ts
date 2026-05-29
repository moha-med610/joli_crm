import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { otpEmailTemp } from 'src/utils/mails/otpEmail.temp';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome Test',
      html: otpEmailTemp(otp),
    });
  }
}
