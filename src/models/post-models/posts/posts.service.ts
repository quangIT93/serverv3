import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import { countByHotTopicQuery, findByHotTopicQuery } from './repository';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
// import { PostNormally } from './class/normallyPost.class';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) { }

    async findByAccountId(accountId: string): Promise<Post[]> {
        return this.postsRepository
        .createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId })
        .select([
            'posts.id', 
            'posts.title', 
            'posts.createdAt', 
            'posts.updatedAt'
        ])
        .orderBy('posts.createdAt', 'DESC')
        // .take(3)
        .skip(0)
        .limit(3)
        .getMany();
    }

    async findByQuery(query: any, limit: number, page: number): Promise<any[]> {
        return findByHotTopicQuery(this.postsRepository, query, page, limit);
    }

    async countByQuery(query: HotTopicQueriesDto): Promise<number> {
        return countByHotTopicQuery(this.postsRepository, query);
    }

    async findOne(id: number): Promise<Post | null> {
        return this.postsRepository
        .findOne({
            relations: [
                'categories',
                'categories.parentCategory',
                'ward',
                'ward.district',
                'ward.district.province',
                'postImages',
                'jobTypeData'
            ],
            where: { 
                id
            },
        });
    }

    async create(dto: CreatePostByAdminDto): Promise<Post> {
        try {
            const post = this.postsRepository.create(dto.toEntity());
            return this.postsRepository.save(post);
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}
