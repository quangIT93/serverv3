import {  Controller, Get, Logger, Param, ParseIntPipe, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { HotTopicQueriesDto } from "./dto/hot-topic-queries.dto";
import { PostNormallyInterceptor } from "./interceptors/posts-normally.iterceptor";
import { AuthGuard } from "src/authentication/auth.guard";
import { AuthNotRequiredGuard } from "src/authentication/authNotRequired.guard";

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

        const { childrenCategoryId, parentCategoryId, isRemotely } = hotTopicQueries;
        const query = {
            childrenCategoryId,
            parentCategoryId,
            isRemotely,
        };
        return this.postsService.findByQuery(query, limit, page); 
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        Logger.log('findOne');
        return this.postsService.findOne(id);
    }
}