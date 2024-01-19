import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts/entities';
import { Repository } from 'typeorm';
import { GetSearchPostDto } from './dto/get-search-post.dto';

@Injectable()
export class SearchPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async findAll(query: GetSearchPostDto, accountId?: string) {
    const {
      money_type,
      districtId,
      is_working_weekend,
      jobTypeId,
      salary_type,
      salary_max,
      salary_min,
      is_remotely,
      categories,
      provinceIds,
      q,
    } = query;

    try {
      const filter = this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'provinces')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .leftJoinAndSelect('posts.salaryTypeData', 'salaryType')
        .leftJoinAndSelect('posts.jobTypeData', 'jobType')
        .leftJoinAndSelect('posts.categories', 'categories')
        .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
        .leftJoinAndSelect('posts.companyResource', 'companyResourceData')
        .leftJoinAndSelect(
          'posts.bookmarks',
          'bookmarks',
          'bookmarks.accountId = :accountId',
          { accountId },
        )
        .andWhere('posts.status = :status', { status: 1 });
      if (q) {
        filter.andWhere('LOWER(posts.title) LIKE LOWER(:q)', { q: `%${q}%` });
      }

      if (money_type) {
        filter.andWhere('posts.moneyType = :money_type', {
          money_type,
        });
      }

      if (is_working_weekend !== undefined) {
        filter.andWhere('posts.isWorkingWeekend = :is_working_weekend', {
          is_working_weekend,
        });
      }

      if (is_remotely !== undefined) {
        filter.andWhere('posts.isRemotely = :is_remotely', {
          is_remotely,
        });
      }

      if (jobTypeId !== undefined) {
        if (
          jobTypeId !== 1 &&
          jobTypeId !== 2 &&
          jobTypeId !== 4 &&
          jobTypeId !== 7
        ) {
          throw new BadRequestException('Please enter the correct jobTypeId');
        } else {
          filter.andWhere('posts.jobType = :jobTypeId', {
            jobTypeId,
          });
        }
      }

      if (salary_type !== undefined) {
        if (
          salary_type !== 1 &&
          salary_type !== 2 &&
          salary_type !== 3 &&
          salary_type !== 4 &&
          salary_type !== 5 &&
          salary_type !== 6
        ) {
          throw new BadRequestException('Please enter the correct salary type');
        } else {
          filter.andWhere('posts.salaryType = :salary_type', {
            salary_type,
          });
        }
      }

      if (salary_min !== undefined && salary_max) {
        if (salary_max < salary_min) {
          throw new BadRequestException(
            'Salary max must greater than salary min',
          );
        }

        filter.andWhere(
          '((posts.salary_min BETWEEN :salary_min AND :salary_max) OR (posts.salary_max BETWEEN :salary_min AND :salary_max))',
          { salary_min, salary_max },
        );
      } else if (salary_min !== undefined) {
        filter.andWhere('posts.salary_min >= :salary_min', { salary_min });
      } else if (salary_max) {
        filter.andWhere('posts.salary_max <= :salary_max', { salary_max });
      }

      if (districtId) {
        filter.andWhere('ward.district.id IN (:...districtId)', {
          districtId: Array.isArray(districtId)
            ? districtId.map((item) => +item)
            : [+districtId],
        });
      }

      if (provinceIds) {
        filter.andWhere('provinces.id IN (:...provinceIds)', {
          provinceIds: Array.isArray(provinceIds)
            ? provinceIds.map((item) => +item)
            : [+provinceIds],
        });
      }

      if (categories) {
        filter.andWhere('categories.id IN (:...categories)', {
          categories: Array.isArray(categories)
            ? categories.map((item) => +item)
            : [+categories],
        });
      }

      const total = await filter.getCount();

      const result = await filter
        .take(query.limit)
        .skip(query.page ? query.page * query.limit : 0)
        .orderBy('posts.createdAt', 'DESC')
        .getMany();
      return {
        total,
        result,
        is_over:
          result.length === total
            ? true
            : result.length < query.limit
            ? true
            : false,
      };
    } catch (error) {
      throw error;
    }
  }
}
