import { ImageValidator } from './../../../common/decorators/validation/image-validator/image.validator';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PostNormallyInterceptor } from './interceptors/posts-topic.interceptor';
import { AuthGuard } from 'src/authentication/auth.guard';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostImagesPipe } from 'src/common/helper/transform/post-image.transform';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CreatePostByAdminController } from './controller';
import { PostDetailInterceptor } from './interceptors/posts-detail.interceptor';
import { PostNotificationsService } from 'src/models/notifications-model/post-notifications/post-notifications.service';
import { NewestPostQueriesDto } from './dto/newest-queries.dto';
import { PostNewInterceptor } from './interceptors/posts-new.interceptor';
import { NearByQueriesDto } from './dto/nearby-queries.dto';
import { ThrottlerBehindProxyGuard } from 'src/throttlerBehindProxyGuard.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { PostsInterceptor } from './interceptors/posts.interceptor';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(ThrottlerBehindProxyGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postNotification: PostNotificationsService,
  ) {}

  @Get('account/checkPostedToday')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async checkUserPostedToday(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.postsService.checkUserPostedToday(accountId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @UseGuards(AuthGuard)
  @Get('account/:accountId')
  async findByAccountId(@Param('accountId') accountId: string) {
    return this.postsService.findByAccountId(accountId);
  }

  @SkipThrottle()
  @ApiQuery({ name: 'threshold', required: false })
  @Get('newest')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNewInterceptor)
  async getNewestPosts(
    @Query() queries: NewestPostQueriesDto,
    @Req() req: CustomRequest,
  ) {
    const { limit = 20, page = 0 } = req;
    const { threshold } = queries;
    return this.postsService.getNewestPosts(limit, page, queries, threshold);
  }

  @SkipThrottle()
  @ApiBearerAuth()
  @Get('nearby')
  @UseGuards(AuthGuard)
  @UseInterceptors(PostNewInterceptor)
  async getNearbyPosts(
    @Query() queries: NearByQueriesDto,
    @Req() req: CustomRequest,
  ) {
    const { limit = 20, page = 0 } = req;
    // const { threshold } = queries;
    const accountId = req.user?.id;

    if (!accountId) {
      throw new UnauthorizedException();
    }

    return this.postsService.getNearByPosts(limit, page, queries, accountId);
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'provinceId', required: false })
  @Get('topic/:id')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNormallyInterceptor)
  async findByTopicId(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Query('provinceId') provinceId?: string,
  ) {
    const { limit, page } = req;
    return this.postsService.findByHotTopicId(id, limit, page, provinceId);
  }

  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(ClassSerializerInterceptor, PostDetailInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findOne(id);
  }

  @ApiBasicAuth()
  @Post('by-admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async createByAdmin(@Body() _createPostByAdminDto: CreatePostByAdminDto) {
    return 'createByAdmin';
  }

  /**
   *
   * @param images
   * @param dto
   * @param req
   * @param res
   * @returns Post
   *
   * @description
   * 1. Create post
   * 2. Upload images to AWS S3
   * 3. Create post images
   * 4. Create post resource
   * 5. Create post categories
   *
   */
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('by-worker')
  @Roles(Role.WORKER, Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      fileFilter: (_req, _file, cb) => {
        if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createByWorker(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
        .addValidator(
          new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }),
        )
        .build({
          fileIsRequired: false,
          exceptionFactory: (errors) => {
            return new Error(errors);
          },
        }),
      PostImagesPipe,
    )
    images: Express.Multer.File[],
    @Body() dto: CreatePostByAdminDto,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    return new CreatePostByAdminController(
      this.postsService,
      req,
      res,
      this.postNotification,
    ).createPostByAdminController({ dto, images });
  }

  /**
   *
   * @param images
   * @param dto
   * @param req
   * @param res
   * @returns Post
   *
   * @description
   * 1. Create post
   * 2. Upload images to AWS S3
   * 3. Create post images
   * 4. Create post resource
   * 5. Create post categories
   *
   */
  // @ApiConsumes('multipart/form-data')
  // @ApiBearerAuth()
  // @Post('')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FilesInterceptor('images', 5, {
  //     fileFilter: (_req, _file, cb) => {
  //         if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
  //             return cb(new Error('Only image files are allowed!'), false);
  //         }
  //         cb(null, true);
  //     }
  // }))
  // async create(
  //     @UploadedFiles(
  //         new ParseFilePipeBuilder()
  //             .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
  //             .addValidator(new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }))
  //             .build({
  //                 fileIsRequired: false,
  //                 exceptionFactory: (errors) => {
  //                     return new Error(errors);
  //                 }
  //             }),
  //         PostImagesPipe,
  //     )
  //     images: Express.Multer.File[],
  //     @Body() dto: CreatePostByUserDto,
  //     @Req() req: CustomRequest,
  //     @Res() res: Response,
  // ) {
  //     return new CreatePostController(this.postsService, req, res, this.postNotification)
  //     .createPostController({dto, images});
  // }

  @Get('company/:id')
  @ApiBearerAuth()
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(ClassSerializerInterceptor, PostsInterceptor)
  async findPostsByCompanyId(
    @Param('id') id: number,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;
      const { limit, page, status } = req.query;

      return await this.postsService.findPostsByCompanyId(
        +id,
        limit ? +limit : 20,
        page ? +page : 0,
        status ? +status : 1,
        accountId,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Getting error');
    }
  }
}
