import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import { countByHotTopicQuery, findByHotTopicQuery } from './repository';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_POST_UPLOAD } from 'src/common/constants';
import { PostsImagesService } from '../posts-images/posts-images.service';
import { CreatePostsImageDto } from '../posts-images/dto/create-posts-image.dto';
import { PostImages } from '../posts-images/entities/post-images.entity';
import { PostsCategoriesService } from '../posts-categories/posts-categories.service';
import { CreatePostCategoriesDto } from '../posts-categories/dto/create-posts-categories.dto';
import { PostCategories } from '../posts-categories/entities/posts-categories.entity';
import { CreatePostResourceDto } from '../post-resource/dto/create-post-resource.dto';
import { PostResourceService } from '../post-resource/post-resource.service';
// import { PostNormally } from './class/normallyPost.class';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly awsService: AWSService,
        private readonly postImagesService: PostsImagesService,
        private readonly postCategoriesService: PostsCategoriesService,
        private readonly postResourceService: PostResourceService
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
                'jobTypeData',
                'companyInformation',
                'companyInformation.ward',
                'companyInformation.ward.district',
                'companyInformation.ward.district.province',
                'companyInformation.companySize',
                'companyInformation.companyRole',
                'postResource',
                'postResource.companyResource',
                'salaryTypeData',
            ],
            where: { 
                id,
                status: 1
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

    /**
     * 
     * @param postId 
     * @param images 
     * @returns 
     * @description: save post images to aws s3 and save to database
     */
    async savePostImages(postId: number, images: Express.Multer.File[]): Promise<PostImages[] | []> {
        const resultUploadImages = await this.awsService.uploadMutilpleFiles(images, {BUCKET: BUCKET_IMAGE_POST_UPLOAD, id: postId});
        const postImageDto: CreatePostsImageDto[] = resultUploadImages.map((image) => {
            return new CreatePostsImageDto(postId, image.originalname, 0);
        });
        postImageDto[0].type = 1; // set thumbnail
        const postImages = this.postImagesService.createPostImages(postImageDto);
        return postImages;
    }

    /**
     * 
     * @param postId
     * @param categories
     * @returns
     * @description: save post categories to database
     */
    async savePostCategories(postId: number, categories: number[]): Promise<PostCategories[]> {
        const dto: CreatePostCategoriesDto[] = categories.map((categoryId) => {
            return new CreatePostCategoriesDto(postId, categoryId);
        });
        const postCategories = await this.postCategoriesService.createPostCategories(dto);
        return postCategories;
    }

    /**
     * @param id: post id
     * @param url: url of resource
     * @param companyId: company id
     * @returns
     * @description: save post resource to database
     */
    async savePostResource(id: number, url: string, companyId: number): Promise<any> {
        const dto = new CreatePostResourceDto(id, url, companyId);
        const postResource = await this.postResourceService.create(dto);
        return postResource;
    }
}
