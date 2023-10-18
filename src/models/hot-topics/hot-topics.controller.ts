import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HotTopicsService } from './hot-topics.service';
import { ApiTags } from '@nestjs/swagger';
import { GetHotTopicDto } from './dto/get-hot-topic.dto';
import { HotTopicsInterceptor } from './interceptors/hot-topics.interceptor';

@ApiTags('hot-topics')
@Controller('topics')
export class HotPostsController {
  constructor(private hotTopicService: HotTopicsService) {}

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor, HotTopicsInterceptor)
  async getHotTopics(@Query() dto: GetHotTopicDto) {
    const hotTopics = await this.hotTopicService.getHotTopics(dto);
    return hotTopics;
  }

  // @Post('')
  // async createHotTopic(@Body() _dto: CreateHotTopicDto) {
  //   return new NotFoundException();
  //   // return await this.hotTopicService.createHotTopic(_dto);
  // }
}
