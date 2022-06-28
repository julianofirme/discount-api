import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}
  async like(createLikeDto: CreateLikeDto) {
    const like = await this.prisma.postLikes.create({
      data: {
        ...createLikeDto,
      },
    });

    return like;
  }

  async unlike(uuid: string) {
    const existent_like = await this.prisma.postLikes.findFirst({
      where: { uuid },
    });

    if (!existent_like)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const like = await this.prisma.postLikes.delete({
      where: { uuid },
    });

    return like;
  }
}
