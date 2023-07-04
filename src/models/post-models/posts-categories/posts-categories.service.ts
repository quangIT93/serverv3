import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategories } from './entities/posts-categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsCategoriesService {
    constructor(
        @InjectRepository(PostCategories)
        private readonly postCategoriesRepository: Repository<PostCategories>,
    ) { }

    async create(dto: any) {
        const postCategories = this.postCategoriesRepository.create(dto);
        return await this.postCategoriesRepository.save(postCategories);
    }

}
