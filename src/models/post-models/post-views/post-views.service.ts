import { Injectable } from '@nestjs/common';
import { CreatePostViewDto } from './dto/create-post-view.dto';
import { UpdatePostViewDto } from './dto/update-post-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostView } from './entities/post-view.entity';

@Injectable()
export class PostViewsService {
  constructor(
    @InjectRepository(PostView)
    private postViewRepository: Repository<PostView>,
    ) {}
    
  getLogsByUserId(id: string, page: number, limit: number) {
    return this.postViewRepository.createQueryBuilder('post_view')
      .select('post_view.createdAt', 'post_view_created_at')
      .addSelect('post_view.postId', 'post_view_post_id')
      .addSelect('post_view.accountId', 'post_view_account_id')
      .where('post_view.accountId = :id', { id })
      .leftJoinAndSelect('post_view.post', 'post')
      .leftJoinAndSelect('post.salaryTypeData', 'salaryTypeData')
      .leftJoinAndSelect('post.jobTypeData', 'jobTypeData')
      .leftJoinAndSelect('post.companyResource', 'companyResource')
      .leftJoinAndSelect('post.postImages', 'postImages')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
      .leftJoinAndSelect('post.ward', 'ward')
      .leftJoinAndSelect('ward.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect(
        'post.bookmarks',
        'bookmarks',
        'bookmarks.accountId = :id',
        { id },
      )
      .orderBy('post_view.createdAt', 'DESC')
      .skip(page * (limit - 1))
      .take(limit)
      .getMany();
  }
  async create(_createPostViewDto: CreatePostViewDto) {
    if (await this.findOneByPostIdAndAccountId(_createPostViewDto.postId, _createPostViewDto.accountId)) {
      return;
    }

    const record = this.postViewRepository.create(_createPostViewDto);

    return this.postViewRepository.save(record);
  }

  async findAllByAccountId(accountId: string) {
    return await this.postViewRepository.createQueryBuilder('post_view')
      .select('MONTH(post_view.created_at)', 'month')
      .addSelect('YEAR(post_view.created_at)', 'year')  
      .addSelect('COUNT(*)', 'count')
      .where('post_view.account_id = :accountId', { accountId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC')
      .getRawMany();
  }

  async getTotalViewByAccountId(accountId: string) {
    return await this.postViewRepository.createQueryBuilder('post_view')
      .select('COUNT(*)', 'count')
      .where('post_view.account_id = :accountId', { accountId })
      .getRawOne();
  }

  async findOneByPostIdAndAccountId(postId: number, accountId: string) {
    return await this.postViewRepository.findOne({
      where: {
        postId,
        accountId,
      }
    });
  }

  update(id: number, _updatePostViewDto: UpdatePostViewDto) {
    return `This action updates a #${id} postView`;
  }

  remove(id: number) {
    return `This action removes a #${id} postView`;
  }
}
