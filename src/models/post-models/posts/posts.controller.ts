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
    Res,
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
import { ImagesPipe, ImagesTransformed } from 'src/common/helper/transform/image.transform';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AWSService } from 'src/services/aws/aws.service';
import { PostsImagesService } from '../posts-images/posts-images.service';
import { createPostByAdminController } from './controller';
import { PostResourceService } from '../post-resource/post-resource.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly awsService: AWSService,
        private readonly postImageService: PostsImagesService,
        private readonly postResourceService: PostResourceService,
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

        const { ...constantsQuery } = hotTopicQueries;
        const query = {
            ...constantsQuery,
        };

        if (Object.keys(query).length === 0) {
            return [];
        }


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
                .addValidator(new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }))
                .build({
                    fileIsRequired: false,
                    exceptionFactory: (errors) => {
                        console.log(errors);
                        return new Error(errors);
                    }
                }),
            ImagesPipe,
        )
        images: ImagesTransformed,
        @Body()
        dto: CreatePostByAdminDto,
        @Req() req: CustomRequest,
        @Res() res: any,
    ) {
        return await createPostByAdminController({
            dto,
            req,
            res,
            images,
            awsService: this.awsService,
            postImageService: this.postImageService,
            postsService: this.postsService,
            postResourceService: this.postResourceService,
        });
    }
}
