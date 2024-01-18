import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SearchPostService } from './search-post.service';
import { GetSearchPostDto } from './dto/get-search-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchPostInterceptor } from './interceptor/search-post.interceptor';
@ApiTags('Search-post')
@Controller('search-post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @UseInterceptors(ClassSerializerInterceptor, SearchPostInterceptor)
  @Get()
  findAll(@Query() query: GetSearchPostDto) {
    return this.searchPostService.findAll(query);
  }
}
