import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
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

    if (company)
      throw new HttpException(
        'Uma empresa com o mesmo email ou CNPJ já está cadastrada',
      );

    const password = createCompanyDto.password
      ? await bcrypt.hash(createCompanyDto.password, 8)
      : undefined;
    return this.prisma.company.create({
      data: {
        ...createCompanyDto,
        password,
      },
    });
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
