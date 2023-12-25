import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { PostViewInterceptor } from './interceptors/post-views.interceptor';

@Controller('post-view')
@ApiTags('post-view')
export class PostViewsController {
  constructor(private readonly postViewsService: PostViewsService) {}

  @Get('')
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, PostViewInterceptor)
  async getLogsByUserId(@Req() req: CustomRequest) {
    const { page, limit } = req;

    return await this.postViewsService.getLogsByUserId(
      req.user?.id ?? '',
      page ?? 0,
      limit ?? 20,
    );
  }
}
