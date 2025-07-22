import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { ImageModelType } from 'src/common/entities/image.entity';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { RolesEnum } from 'src/users/const/roles.const';
import { Roles } from 'src/users/decorator/roles.decorator';
import { User } from 'src/users/decorator/user.decorator';
import { DataSource, QueryRunner as QR } from 'typeorm';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article-dto';
import { PaginateArticleDto } from './dto/paginate-article.dto';
import { PaginateUserPublicArticleDto } from './dto/paginate-user-public-article-dto';
import { PaginateWorkspaceArticleDto } from './dto/paginate-workspace-articles-dto';
import { UpdateArticleDto } from './dto/update-article-dto';
import { IsArticleMineOrAdminGuard } from './guard/is-article-mine-or-admin.guard';
import { ArticlesThumbnailService } from './thumbnail/dto/thumbnail.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly dataSource: DataSource,
    private readonly articlesThumbnailService: ArticlesThumbnailService,
  ) {}

  @Get('author/:id')
  @UseInterceptors(LogInterceptor)
  @IsPublic()
  async getArticlesAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.getArticlesAuthor(id);
  }

  @Get('users')
  @UseInterceptors(LogInterceptor)
  @IsPublic()
  getUserPublicArticles(
    @Query() query: PaginateUserPublicArticleDto,
    // @Query() devName: string,
  ) {
    return this.articlesService.paginateUserPublicArticles(query);
  }

  @Get('workspace')
  @UseInterceptors(LogInterceptor)
  getWorkspaceArticles(@Query() query: PaginateWorkspaceArticleDto, @User('id') userId: number) {
    return this.articlesService.paginateWorkspaceArticles(query, userId);
  }

  @Get()
  @IsPublic()
  @UseInterceptors(LogInterceptor)
  // @UseFilters(HttpExceptionFilter)
  getArticles(@Query() query: PaginateArticleDto) {
    return this.articlesService.paginateArticles(query);
  }

  // 2) GET /articles/:id
  //    id에 해당하는 articles를 가져온다.
  @Get(':id')
  @IsPublic()
  getArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.getPublicArticleById(id);
  }

  // article Id를 주면 author 정보를 가져온다.
  @Get('workspace/:id')
  getWorkspaceArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.getWorkspaceArticleById(id);
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async postCreateArticle(
    @User('id') userId: number,
    @Body() body: CreateArticleDto,
    @QueryRunner() qr: QR,
  ) {
    const article = await this.articlesService.createArticle(userId, body, qr);

    for (let i = 0; i < body.thumbnails.length; i++) {
      await this.articlesThumbnailService.createArticleThumbnail(
        {
          article,
          order: i,
          path: body.thumbnails[i],
          type: ImageModelType.ARTICLE_IMAGE,
        },
        qr,
      );
    }
    return this.articlesService.getPrivateArticleById(article.id, qr);
  }

  @Patch(':articleId')
  @UseInterceptors(TransactionInterceptor)
  @UseGuards(IsArticleMineOrAdminGuard)
  async patchEditArticle(
    @Param('articleId', ParseIntPipe) id: number,
    @Body() body: UpdateArticleDto,
    @QueryRunner() qr: QR,
  ) {
    const article = await this.articlesService.updateArticle(id, body, qr);

    for (let i = 0; i < body.thumbnails.length; i++) {
      await this.articlesThumbnailService.createArticleThumbnail(
        {
          article,
          order: i,
          path: body.thumbnails[i],
          type: ImageModelType.ARTICLE_IMAGE,
        },
        qr,
      );
    }
    return this.articlesService.getPrivateArticleById(article.id, qr);
  }
  @Delete(':id')
  @UseGuards(IsArticleMineOrAdminGuard)
  @Roles(RolesEnum.ADMIN)
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.deleteArticle(id);
  }
}
