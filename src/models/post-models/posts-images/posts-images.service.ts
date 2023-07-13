import { Injectable } from '@nestjs/common';
import { CreatePostsImageDto } from './dto/create-posts-image.dto';
import { UpdatePostsImageDto } from './dto/update-posts-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostImages } from './entities/post-images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsImagesService {
  constructor(
    @InjectRepository(PostImages)
    private readonly postsImagesRepository: Repository<PostImages>,
  ) { }

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

  async createPostsImage(dto: CreatePostsImageDto): Promise<PostImages[]> {
    const { postId, images } = dto;

    //postId is number
    //images is string[]
    const data = [];

    for (let i = 0; i < images.length; i++) {
      const createPostsImage = new PostImages();
      createPostsImage.postId = postId;
      createPostsImage.image = images[i];
      const result = await this.postsImagesRepository.save(createPostsImage);
      data.push(result);
    }

    return data;
    
  }


}
