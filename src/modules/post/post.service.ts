import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { uuid } from 'uuidv4';
import { LikeService } from '../like/like.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    public likeService: LikeService,
  ) {}
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

  async like(post_uuid: string, customer_uuid: string) {
    const existent_post = await this.prisma.post.findFirst({
      where: { uuid: post_uuid },
    });

    if (!existent_post)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.prisma.post.update({
      where: { uuid: post_uuid },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    this.likeService.like({ post_uuid, customer_uuid });

    return post;
  }

  async unlike(post_uuid: string) {
    const existent_post = await this.prisma.post.findFirst({
      where: { uuid: post_uuid },
    });

    if (!existent_post)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.prisma.post.update({
      where: { uuid: post_uuid },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });

    this.likeService.unlike(post_uuid);

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
