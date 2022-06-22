import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { uuid } from 'uuidv4';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          {
            email: createCustomerDto.email,
          },
          {
            document: createCustomerDto.document,
          },
        ],
      },
    });

    if (customer) {
      throw new HttpException(
        'Uma empresa com o mesmo email ou CNPJ já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = createCustomerDto.password
      ? await bcrypt.hash(createCustomerDto.password, 8)
      : undefined;

    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        uuid: uuid(),
        password,
      },
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  // findProducts(uuid: string) {
  //   return this.prisma.product.findMany({
  //     where: {
  //       customer_uuid: uuid,
  //     },
  //   });
  // }

  findOne(uuid: string) {
    return this.prisma.customer.findUnique({
      where: { uuid },
    });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findUnique({
      where: { email },
    });
  }

  async update(uuid: string, updateCustomerDto: UpdateCustomerDto) {
    const existent_customer = await this.prisma.customer.findFirst({
      where: { uuid },
    });

    if (!existent_customer)
      throw new HttpException('customer not found', HttpStatus.NOT_FOUND);

    const customer = await this.prisma.customer.update({
      where: { uuid },
      data: updateCustomerDto,
    });

    return customer;
  }

  async remove(uuid: string) {
    const existent_customer = await this.prisma.customer.findFirst({
      where: { uuid },
    });

    if (!existent_customer)
      throw new HttpException('customer not found', HttpStatus.NOT_FOUND);

    const customer = await this.prisma.customer.delete({
      where: { uuid },
    });

    return customer;
  }
}
