import { Module } from '@nestjs/common';
import { HotTopicsService } from './hot-topics.service';
import { HotPostsController } from './hot-topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotTopic } from './entities/hot-posts.entity';
// import { PostsService } from '../post-models/posts/posts.service';
import { PostsModule } from '../post-models/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotTopic]),
    PostsModule
  ],
  controllers: [HotPostsController],
  providers: [HotTopicsService],
  exports: [HotTopicsService],
})
export class HotPostsModule {}
