import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import {
  PostsQueryBuilder,
  countByHotTopicQuery,
  findByHotTopicQuery,
} from './repository';
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
import { NewestPostQueriesDto } from './dto/newest-queries.dto';
// import { HotTopicsService } from 'src/models/hot-topics/hot-topics.service';
// import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly awsService: AWSService,
    private readonly postImagesService: PostsImagesService,
    private readonly postCategoriesService: PostsCategoriesService,
    private readonly postResourceService: PostResourceService,
  ) {}

  async findByAccountId(accountId: string): Promise<Post[]> {
    return (
      this.postsRepository
        .createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId })
        .select([
          'posts.id',
          'posts.title',
          'posts.createdAt',
          'posts.updatedAt',
        ])
        .orderBy('posts.createdAt', 'DESC')
        // .take(3)
        .skip(0)
        .limit(3)
        .getMany()
    );
  }

  /**
   *
   * @param id
   * @param limit
   * @param page
   * @returns
   *
   * @description: find posts by hot topic id
   *
   * @example:
   * 1: Influencer
   * 2: Remote job
   * 3: Short time job
   * 4: Today job
   * 5: Freelance job
   * 6: Delivery, Driver
   *
   */

  async findByHotTopicId(
    id: number,
    limit: number,
    page: number,
    _provinceId?: string,
  ): Promise<any> {
    // generate query and call function
    let query = await this.postsRepository.query(
      `SELECT query, title FROM hot_topics WHERE id = ${id} AND status = 1`,
    );

    if (!query || query.length === 0) {
      throw new NotFoundException();
    }

    const data = await findByHotTopicQuery(this.postsRepository, query[0].query, page, limit, _provinceId);

    data.title = query[0].title;

    return data;
  }

  async countByQuery(query: string): Promise<number> {
    return countByHotTopicQuery(this.postsRepository, query);
  }

  async countByHotTopicId(query: string): Promise<number> {
    return countByHotTopicQuery(this.postsRepository, query);
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
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
        'companyInformation.category',
        'companyResource',
        'salaryTypeData',
        'profile',
      ],
      where: {
        id,
        // status: 1,
        // applications: {

        // }
      },
      relationLoadStrategy: 'query',
    });
  }

  async create(dto: CreatePostByAdminDto): Promise<Post> {
    try {
      const post = this.postsRepository.create(dto.toEntity());
      const data = await this.postsRepository.save(post);
      return data;
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
  async savePostImages(
    postId: number,
    images: Express.Multer.File[],
  ): Promise<PostImages[] | []> {
    const resultUploadImages = await this.awsService.uploadMutilpleFiles(
      images,
      { BUCKET: BUCKET_IMAGE_POST_UPLOAD, id: postId },
    );
    const postImageDto: CreatePostsImageDto[] = resultUploadImages.map(
      (image) => {
        return new CreatePostsImageDto(postId, image.originalname, 0);
      },
    );
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
  async savePostCategories(
    postId: number,
    categories: number[],
  ): Promise<PostCategories[]> {
    const dto: CreatePostCategoriesDto[] = categories.map((categoryId) => {
      return new CreatePostCategoriesDto(postId, categoryId);
    });
    const postCategories =
      await this.postCategoriesService.createPostCategories(dto);
    return postCategories;
  }

  /**
   * @param id: post id
   * @param url: url of resource
   * @param companyId: company id
   * @returns
   * @description: save post resource to database
   */
  async savePostResource(
    id: number,
    url: string,
    companyId: number,
  ): Promise<any> {
    const dto = new CreatePostResourceDto(id, url, companyId);
    const postResource = await this.postResourceService.create(dto);
    return postResource;
  }

  async deleteById(id: number): Promise<any> {
    return this.postsRepository.delete(id);
  }

  async getNewestPosts(
    limit: number,
    page: number,
    queries?: NewestPostQueriesDto,
    threshold?: number,
  ): Promise<any[]> {
    return new PostsQueryBuilder(this.postsRepository).getNewestPosts(
      page,
      limit,
      queries,
      threshold,
    );
  }
}
