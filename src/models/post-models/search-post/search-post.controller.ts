import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  // Req,
  BadRequestException,
} from '@nestjs/common';
import { SearchPostService } from './search-post.service';
import { GetSearchPostDto } from './dto/get-search-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
// import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { SearchPostInterceptor } from './interceptor/search-post.interceptor';
@ApiTags('Search-post')
@Controller('search-post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(ClassSerializerInterceptor, SearchPostInterceptor)
  findAll(
    @Query() query: GetSearchPostDto,
    // , @Req() req: CustomRequest
  ) {
    try {
      // const accountId = req.user?.id;
      return this.searchPostService.findAll(
        query,
        // , accountId
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Error getting');
    }
  }

  @Get('/total')
  @ApiBearerAuth()
  @UseGuards(AuthNotRequiredGuard)
  findAllTotal(
    @Query() query: GetSearchPostDto,
    // , @Req() req: CustomRequest
  ) {
    try {
      // const accountId = req.user?.id;
      return this.searchPostService.findAllTotal(
        query,
        // , accountId
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Error getting');
    }
  }
}
