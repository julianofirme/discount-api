import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post content',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Post author name',
  })
  @IsString()
  author_name: string;

  @ApiProperty({
    description: 'Uuid of company what make the post',
  })
  @IsUUID()
  company_uuid: string;

  @ApiProperty({
    description: 'Url of midia posts (photos or videos)',
  })
  @IsUrl()
  media_url?: string;

  @ApiProperty({
    description: 'Number of likes',
  })
  @IsInt()
  likes: number;
}
