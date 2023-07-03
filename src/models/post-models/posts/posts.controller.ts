import { ImageValidator } from './../../../common/decorators/validation/image-validator/image.validator';
import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    ParseFilePipeBuilder,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import { PostNormallyInterceptor } from './interceptors/posts-normally.interceptor';
import { AuthGuard } from 'src/authentication/auth.guard';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesPipe } from 'src/common/helper/transform/image.transform';
// import { AWSService } from 'src/services/aws/aws.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        // private readonly awsService: AWSService,
    ) { }

    @UseGuards(AuthGuard)
    @Get('account/:accountId')
    async findByAccountId(@Param('accountId') accountId: string) {
        return this.postsService.findByAccountId(accountId);
    }

    @ApiBearerAuth('JWT-auth')
    @Get('topic/:id')
    @UseGuards(AuthNotRequiredGuard)
    @UseInterceptors(PostNormallyInterceptor)
    async findByTopicId(
        @Query() hotTopicQueries: HotTopicQueriesDto,
        @Req() req: any,
    ) {
        const { limit, page } = req;

        const {
            childrenCategoryId,
            parentCategoryId,
            isRemotely,
            isShortTimeJobs,
        } = hotTopicQueries;
        const query = {
            childrenCategoryId,
            parentCategoryId,
            isRemotely,
            isShortTimeJobs,
        };

        return this.postsService.findByQuery(query, limit, page);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        Logger.log('findOne');
        return this.postsService.findOne(id);
    }

    @Post('by-admin')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async createByAdmin(@Body() _createPostByAdminDto: CreatePostByAdminDto) {

        return 'createByAdmin';
    }

    @ApiConsumes('multipart/form-data')
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
            .addMaxSizeValidator({ maxSize: 1024 * 1024 * 10 })
            .addValidator(new ImageValidator({mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/}))
            .build({
                fileIsRequired: false,
                exceptionFactory: (errors) => {
                    console.log(errors);
                    return new Error(errors);
                }
            }),
            ImagesPipe, 
        )
        images: {
            images?: Express.Multer.File[];
        },
        @Body()
        dto: CreatePostByAdminDto,
    ) {
        // const uploaded = await this.awsService.uploadImagesForPost(images as any)
        try {
            console.log(images);
            console.log(dto);
            return 'createByWorker';
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
