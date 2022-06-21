import { uuid } from 'uuidv4';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, company_uuid: string) {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        uuid: uuid(),
        company_uuid,
      },
    });

    return product;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.product.findUnique({
      where: { uuid },
    });
  }

  async claimProduct(uuid: string) {
    const existent_product = await this.prisma.product.findFirst({
      where: { uuid },
    });

    if (existent_product.quantity < 1)
      throw new HttpException('Product is not in stock ', HttpStatus.NOT_FOUND);

    const product = await this.prisma.product.update({
      where: { uuid },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    return product;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    const existent_product = await this.prisma.product.findFirst({
      where: { uuid },
    });

    if (!existent_product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    const product = await this.prisma.product.update({
      where: { uuid },
      data: updateProductDto,
    });

    return product;
  }

  async remove(uuid: string) {
    const existent_product = await this.prisma.product.findFirst({
      where: { uuid },
    });

    if (!existent_product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    const product = await this.prisma.product.delete({
      where: { uuid },
    });

    return product;
  }
}
