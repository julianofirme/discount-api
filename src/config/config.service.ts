import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get smtpConfig(): SMTPTransport.Options {
    return this.nestConfigService.get<SMTPTransport.Options>('smtp');
  }

  get webappUrl(): string {
    return this.nestConfigService.get<string>('WEBSITE_URL');
  }
}
