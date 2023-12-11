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
