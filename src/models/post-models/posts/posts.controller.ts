import {  Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { HotTopicQueriesDto } from "./dto/hot-topic-queries.dto";
import { PostNormallyInterceptor } from "./interceptors/posts-normally.interceptor";
import { AuthGuard } from "src/authentication/auth.guard";
import { AuthNotRequiredGuard } from "src/authentication/authNotRequired.guard";
import { RoleGuard } from "src/authentication/role.guard";
import { Role } from "src/common/enum";
import { Roles } from "src/authentication/roles.decorator";
import { CreatePostByAdminDto } from "./dto/admin-create-post.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@ApiTags('Posts')
@Controller('posts')
export class PostsController { 
    constructor(
        private readonly postsService: PostsService
    ) {}

    @UseGuards(AuthGuard)
    @Get('account/:accountId')
    async findByAccountId(@Param('accountId') accountId: string) {
        return this.postsService.findByAccountId(accountId);
    }

    @ApiBearerAuth('JWT-auth')
    @Get('topic/:id')
    @UseGuards(AuthNotRequiredGuard)
    @UseInterceptors(PostNormallyInterceptor)
    async findByTopicId(@Query() hotTopicQueries: HotTopicQueriesDto, @Req() req: any) {

        const { limit, page } = req;

        const { childrenCategoryId, parentCategoryId, isRemotely, isShortTimeJobs } = hotTopicQueries;
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
        return "createByAdmin"
    }


    @Post('by-worker')
    @Roles(Role.WORKER, Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @UseInterceptors(FileFieldsInterceptor([{ name: "images", maxCount: 5 }]))
    async createByWorker(@UploadedFiles() images: { images?: Express.Multer.File[]}) {
        console.log("createByWorker"),
        console.log(images)
        return "createByWorker";
    }
}