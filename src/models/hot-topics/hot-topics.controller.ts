import { Body, Controller, Get, NotFoundException, Post, UseInterceptors } from '@nestjs/common';
import { HotTopicsService } from './hot-topics.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotTopicDto } from './dto/create-hot-topic.dto';
// import { HotTopicsInterxceptor } from './interceptors/hot-topics.interceptor';
import { ResponseInterceptor } from 'src/common/interceptors/reponse.interceptors';
import { PostsService } from '../post-models/posts/posts.service';
import { HotTopicQueriesDto } from '../post-models/posts/dto/hot-topic-queries.dto';

@ApiTags('hot-topics')
@Controller('topics')
export class HotPostsController {
  constructor(
    private hotTopicService: HotTopicsService,
    private postsService: PostsService
  ) {}

  @Get('')
  @UseInterceptors(ResponseInterceptor)
  async getHotTopics() {
    const hotTopics = await this.hotTopicService.getHotTopics();

    return Promise.all(hotTopics.map(async (hotTopic: { query: string[]; }) => {
      let count = await this.postsService.countByQuery(HotTopicQueriesDto.from(hotTopic.query[0]));
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
