import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateArticleDto } from './create-article-dto';

class PickDto extends PickType(CreateArticleDto, [
  'title',
  'contents',
  'description',
  'isPrivate',
]) {}

export class UpdateArticleDto extends PartialType(PickDto) {
  @IsString({
    each: true,
  })
  @IsOptional()
  thumbnails?: string[] = [];

  @IsOptional()
  articleImage?: string;
}
