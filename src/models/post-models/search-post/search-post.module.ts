import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SearchPostService } from './search-post.service';
import { SearchPostController } from './search-post.controller';
import { Post } from '../posts/entities';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), JwtAccessTokenModule],
  controllers: [SearchPostController],
  providers: [SearchPostService],
})
export class SearchPostModule {}
