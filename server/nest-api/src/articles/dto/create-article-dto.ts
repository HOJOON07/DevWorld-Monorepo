import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { ArticlesModel } from '../entities/articles.entity';

export class CreateArticleDto extends PickType(ArticlesModel, [
  'title',
  'description',
  'contents',
  'isPrivate',
]) {
  @IsString({
    each: true,
  })
  @IsOptional()
  thumbnails?: string[] = [];

  @IsOptional()
  articleImage?: string;
}
