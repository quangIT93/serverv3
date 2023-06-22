import { Injectable } from '@nestjs/common';
import { CreatePostsImageDto } from './dto/create-posts-image.dto';
import { UpdatePostsImageDto } from './dto/update-posts-image.dto';

@Injectable()
export class PostsImagesService {
  create(createPostsImageDto: CreatePostsImageDto) {
    console.log(createPostsImageDto);
    return 'This action adds a new postsImage';
  }

  findAll() {
    return `This action returns all postsImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postsImage`;
  }

  update(id: number, updatePostsImageDto: UpdatePostsImageDto) {
    console.log(updatePostsImageDto);
    return `This action updates a #${id} postsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} postsImage`;
  }
}
