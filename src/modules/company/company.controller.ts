import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CompanyUserRequest } from '../auth/models/CompanyUserRequest';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.companyService.findOne(uuid);
  }

  @Get('/products')
  products(@Req() req: CompanyUserRequest) {
    return this.companyService.findProducts(req.user.uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(uuid, updateCompanyDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.companyService.remove(uuid);
  }
}
