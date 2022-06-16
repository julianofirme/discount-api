import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './modules/company/company.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ProductModule } from './modules/product/product.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CompanyModule,
    ProductModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
