import { ImageValidator } from './../../../common/decorators/validation/image-validator/image.validator';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Logger,
    Param,
    ParseFilePipeBuilder,
    ParseIntPipe,
    Post,
    Query,
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
// import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import { PostNormallyInterceptor } from './interceptors/posts-normally.interceptor';
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
// import { CreatePostByUserDto } from './dto/user-create-post.dto';
// import { CreatePostController } from './controller/create-post.controller';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly postNotification: PostNotificationsService
    ) { }

    @UseGuards(AuthGuard)
    @Get('account/:accountId')
    async findByAccountId(@Param('accountId') accountId: string) {
        return this.postsService.findByAccountId(accountId);
    }

    @ApiQuery({ name: 'threshold', required: false })
    @Get('newest')
    @UseGuards(AuthNotRequiredGuard)
    @UseInterceptors(PostNormallyInterceptor)
    async getNewestPosts(
        @Query() queries: NewestPostQueriesDto,
        @Req() req: any,
    ) {
        const { limit, page } = req;
        const { threshold } = queries;
        return this.postsService.getNewestPosts(limit, page, queries, threshold);
    }

    @ApiBearerAuth()
    @ApiQuery({ name: 'provinceId', required: false })
    @Get('topic/:id')
    @UseGuards(AuthNotRequiredGuard)
    @UseInterceptors(PostNormallyInterceptor)
    async findByTopicId(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Query("provinceId") provinceId?: string,
    ) {
        const { limit, page } = req;
        return this.postsService.findByHotTopicId(id, limit, page, provinceId); 
    }

    @UseGuards(AuthNotRequiredGuard)
    @UseInterceptors(ClassSerializerInterceptor, PostDetailInterceptor)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        Logger.log('findOne');
        return this.postsService.findOne(id);
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
    @UseInterceptors(FilesInterceptor('images', 5, {
        fileFilter: (_req, _file, cb) => {
            if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        }
    }))
    async createByWorker(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
                .addValidator(new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }))
                .build({
                    fileIsRequired: false,
                    exceptionFactory: (errors) => {
                        return new Error(errors);
                    }
                }),
            PostImagesPipe,
        )
        images: Express.Multer.File[],
        @Body() dto: CreatePostByAdminDto,
        @Req() req: CustomRequest,
        @Res() res: Response,
    ) {
        return new CreatePostByAdminController(this.postsService, req, res, this.postNotification)
        .createPostByAdminController({dto, images});
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
}
