export class Post {
  uuid: string;
  content: string;
  author_name: string;
  company_uuid: string;
  media_url?: string;
  likes: number;

  created_at: Date;
  updated_at: Date;
}
