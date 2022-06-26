import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CompanyUserRequest } from '../auth/models/CompanyUserRequest';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: CompanyUserRequest) {
    return this.postService.create(createPostDto, req.user.uuid);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.postService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(uuid, updatePostDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.postService.remove(uuid);
  }
}
