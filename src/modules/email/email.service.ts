import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ConfigService } from '../../config/config.service';
import { recoveryPasswordEmailBody } from './bodies/recoveryPassword';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private configService: ConfigService) {
    const body = configService.smtpConfig;
    this.transporter = nodemailer.createTransport(body);
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    attatchments?: Mail.Attachment[];
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.smtpConfig.auth.user,
        to: params.to,
        subject: params.subject,
        html: params.html,
        attachments: params.attatchments,
      });

      console.log(info);
    } catch (err: any) {
      console.log(err);
    }
  }

  getPasswordRecoveryEmail({
    first_name,
    url,
  }: {
    first_name: string;
    url: string;
  }) {
    return recoveryPasswordEmailBody(first_name, url);
  }
}
