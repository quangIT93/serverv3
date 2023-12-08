import { Module } from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostView } from './entities/post-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostView])],
  providers: [PostViewsService],
  exports: [PostViewsService],  
})
export class PostViewsModule {}
