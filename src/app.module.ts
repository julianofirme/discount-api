import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CompanyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
