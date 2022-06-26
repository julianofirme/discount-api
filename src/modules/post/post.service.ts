import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { uuid } from 'uuidv4';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, company_uuid: string) {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        uuid: uuid(),
        company_uuid,
      },
    });

    return post;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.post.findUnique({
      where: { uuid },
    });
  }

  async update(uuid: string, updatePostDto: UpdatePostDto) {
    const existent_post = await this.prisma.post.findFirst({
      where: { uuid },
    });

    if (!existent_post)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.prisma.post.update({
      where: { uuid },
      data: updatePostDto,
    });

    return post;
  }

  async remove(uuid: string) {
    const existent_post = await this.prisma.post.findFirst({
      where: { uuid },
    });

    if (!existent_post)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.prisma.post.delete({
      where: { uuid },
    });

    return post;
  }
}
