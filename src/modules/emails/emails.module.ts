import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>('EMAIL_HOST'),
            auth: {
              user: config.get<string>('EMAIL_USER'),
              pass: config.get<string>('EMAIL_PASS'),
            },
          },
          defaults: {
            from: '"JOLI CRM" <no-reply@myapp.com>',
          },
        };
      },
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
