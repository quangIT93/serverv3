import { Body, Controller, Get, NotFoundException, Post, Query, UseInterceptors } from '@nestjs/common';
import { HotTopicsService } from './hot-topics.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotTopicDto } from './dto/create-hot-topic.dto';
// import { HotTopicsInterxceptor } from './interceptors/hot-topics.interceptor';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptors';
import { PostsService } from '../post-models/posts/posts.service';
import { GetHotTopicDto } from './dto/get-hot-topic.dto';


@ApiTags('hot-topics')
@Controller('topics')
export class HotPostsController {
  constructor(
    private hotTopicService: HotTopicsService,
    private postsService: PostsService
  ) {}

  @Get('')
  @UseInterceptors(ResponseInterceptor)
  async getHotTopics(@Query() dto: GetHotTopicDto) {
    // 
    const hotTopics = await this.hotTopicService.getHotTopics(dto);
    return Promise.all(hotTopics.map(async (hotTopic) => {

      let count = await this.postsService.countByHotTopicId(hotTopic.id);
      return {
          ...hotTopic,
          count
      };
    }));
  }

  
  @Post('')
  async createHotTopic(@Body() _dto: CreateHotTopicDto) {
    return new NotFoundException();
    // return await this.hotTopicService.createHotTopic(_dto);
  }
}
