import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SearchPostService } from './search-post.service';
import { SearchPostController } from './search-post.controller';
import { Post } from '../posts/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [SearchPostController],
  providers: [SearchPostService],
})
export class SearchPostModule {}
