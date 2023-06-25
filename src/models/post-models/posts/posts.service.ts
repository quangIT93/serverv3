import { QUERY_IS_SHORT_TIME_JOBS } from './../../../common/constants/postQuery.constants';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { QUERY_CHILDREN_CATEGORY_ID, QUERY_IS_REMOTELY, QUERY_PARENT_CATEGORY_ID } from 'src/common/constants';
import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
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
        const queryBuilder =  this.postsRepository
        .createQueryBuilder('posts')
        .select([
            'posts.id',
            'posts.title',
            'posts.accountId',
            'posts.companyName',
            'posts.address',
            'posts.salaryMin',
            'posts.salaryMax',
            'posts.createdAt',
        ])
        .leftJoinAndSelect('posts.categories', 'categories')
        .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
        .leftJoinAndSelect('posts.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .leftJoinAndSelect('posts.jobTypeData', 'jobTypeData')
        .leftJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
        .leftJoinAndSelect('posts.postResource', 'postResource')
        .leftJoinAndSelect('postResource.companyResource', 'companyResource')
        .where('posts.status = 1')
        .where(`categories.id = :${QUERY_CHILDREN_CATEGORY_ID}`, { [QUERY_CHILDREN_CATEGORY_ID]: query[QUERY_CHILDREN_CATEGORY_ID] })
        .orWhere(`categories.parentCategoryId = :${QUERY_PARENT_CATEGORY_ID}`, { [QUERY_PARENT_CATEGORY_ID]: query[QUERY_PARENT_CATEGORY_ID] })
        .orWhere(`posts.isRemotely = :${QUERY_IS_REMOTELY}`, { [QUERY_IS_REMOTELY]: String(query[QUERY_IS_REMOTELY]) })

        if (query[QUERY_IS_SHORT_TIME_JOBS] === 1) {
            queryBuilder.orWhere(`posts.start_date IS NOT NULL`);
        }

        return queryBuilder
        .orderBy('posts.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

        // .orWhere(`${query.isShortTimeJobs === '1' ? 'posts.start_time IS NOT NULL' : ''}`)
        // .orderBy('posts.createdAt', 'DESC')
        // .skip((page - 1) * limit)
        // .take(limit)
        // .getMany();
    }

    async countByQuery(query: HotTopicQueriesDto): Promise<number> {
        console.log('query: ', typeof query.isShortTimeJobs);
        const queryBuilder =  this.postsRepository
        .createQueryBuilder('posts')
        .select([
            'posts.id',
            'posts.title',
            'posts.accountId',
            'posts.companyName',
            'posts.address',
            'posts.salaryMin',
            'posts.salaryMax',
            'posts.createdAt',
        ])
        .leftJoinAndSelect('posts.categories', 'categories')
        .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
        .leftJoinAndSelect('posts.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .leftJoinAndSelect('posts.jobTypeData', 'jobTypeData')
        .leftJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
        .leftJoinAndSelect('posts.postResource', 'postResource')
        .leftJoinAndSelect('postResource.companyResource', 'companyResource')
        .where('posts.status = 1')
        .where(`categories.id = :${QUERY_CHILDREN_CATEGORY_ID}`, { [QUERY_CHILDREN_CATEGORY_ID]: query[QUERY_CHILDREN_CATEGORY_ID] })
        .orWhere(`categories.parentCategoryId = :${QUERY_PARENT_CATEGORY_ID}`, { [QUERY_PARENT_CATEGORY_ID]: query[QUERY_PARENT_CATEGORY_ID] })
        .orWhere(`posts.isRemotely = :${QUERY_IS_REMOTELY}`, { [QUERY_IS_REMOTELY]: String(query[QUERY_IS_REMOTELY]) })

        if (query[QUERY_IS_SHORT_TIME_JOBS] === 1) {
            queryBuilder.orWhere(`posts.start_date IS NOT NULL`);
        }
        return queryBuilder.getCount();

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

    tranformPostDetail() {
    }

}
