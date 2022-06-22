import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { uuid } from 'uuidv4';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.prisma.company.findFirst({
      where: {
        OR: [
          {
            email: createCompanyDto.email,
          },
          {
            document: createCompanyDto.document,
          },
        ],
      },
    });

    if (company) {
      throw new HttpException(
        'Uma empresa com o mesmo email ou CNPJ já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = createCompanyDto.password
      ? await bcrypt.hash(createCompanyDto.password, 8)
      : undefined;

    return this.prisma.company.create({
      data: {
        ...createCompanyDto,
        uuid: uuid(),
        password,
      },
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.customer.findUnique({
      where: { uuid },
    });
  }

  findProducts(uuid: string) {
    return this.prisma.product.findMany({
      where: {
        company_uuid: uuid,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.company.findUnique({
      where: { email },
    });
  }

  async update(uuid: string, updateCompanyDto: UpdateCompanyDto) {
    const existent_company = await this.prisma.company.findFirst({
      where: { uuid },
    });

    if (!existent_company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    const company = await this.prisma.company.update({
      where: { uuid },
      data: updateCompanyDto,
    });

    return company;
  }

  async remove(uuid: string) {
    const existent_company = await this.prisma.company.findFirst({
      where: { uuid },
    });

    if (!existent_company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    const company = await this.prisma.company.delete({
      where: { uuid },
    });

    return company;
  }
}
