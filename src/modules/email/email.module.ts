import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
