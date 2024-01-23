import { Repository } from 'typeorm/repository/Repository';
import { Post } from '../entities';
import { FilterPostDto } from '../dto/filter-post.dto';
import { BadRequestException } from '@nestjs/common';

function __init__(
  respository: Repository<Post>,
  query: string,
  options: {
    provinceId?: string;
  } = {},
) {
  let queryBuilder = InitQuerySelectNormallyPost(respository);
  if (query === 'posts.createdAt') {
    queryBuilder = queryBuilder.andWhere(`posts.createdAt >= :createdAt`, {
      createdAt: new Date().toISOString().split('T')[0],
    });
  } else {
    queryBuilder = queryBuilder.andWhere(query);
  }

  if (options.provinceId) {
    queryBuilder.andWhere(`province.id = :provinceId`, {
      provinceId: options.provinceId,
    });
  }

  // console.log(queryBuilder.getQuery());

  return queryBuilder;
}

export function countByHotTopicQuery(
  respository: Repository<Post>,
  query: string,
) {
  const queryBuilder = __init__(respository, query);
  return queryBuilder.getCount();
}

// export async function findByHotTopicQuery(
//   respository: Repository<Post>,
//   query: string,
//   page: number,
//   limit: number,
//   province?: string,
// ) {
//   const queryBuilder = __init__(respository, query, { provinceId: province });
//   const data = await queryBuilder
//     .orderBy('posts.createdAt', 'DESC')
//     .skip(page * limit)
//     .take(limit)
//     .getMany();

//   const total = await queryBuilder.getCount();

//   return {
//     data,
//     total,
//     title: '',
//   };
// }
export async function findByHotTopicQuery(
  respository: Repository<Post>,
  query: string,
  page: number,
  limit: number,
  filterPostDto: FilterPostDto,
) {
  const {
    provinceId,
    sortBy = 'DESC',
    salaryMin,
    salaryMax,
    moneyType,
  } = filterPostDto;

  const queryBuilder = __init__(respository, query, { provinceId });
  const posts = await queryBuilder;

  if (sortBy) {
    posts.orderBy('posts.createdAt', sortBy);
  }

  if (moneyType === '1' || moneyType === '2') {
    posts.andWhere('posts.moneyType = :moneyType', { moneyType });
  }

  if (salaryMin !== undefined && salaryMax) {
    if (salaryMax < salaryMin) {
      throw new BadRequestException('Salary max must greater than salary min');
    }

    posts.andWhere(
      '((posts.salaryMin BETWEEN :salaryMin AND :salaryMax) OR (posts.salaryMax BETWEEN :salaryMin AND :salaryMax))',
      { salaryMin, salaryMax },
    );
  } else if (salaryMin !== undefined) {
    posts.andWhere('posts.salaryMin >= :salaryMin', { salaryMin });
  } else if (salaryMax) {
    posts.andWhere('posts.salaryMax <= :salaryMax', { salaryMax });
  }

  const data = await posts
    .skip(page ? page * (limit - 1) : Math.abs(page * limit))
    .take(Math.abs(limit))
    .getMany();

  const total = await posts.getCount();

  return {
    data,
    total,
    title: '',
  };
}

function InitQuerySelectNormallyPost(respository: Repository<Post>) {
  return (
    respository
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
        'posts.moneyType',
      ])
      .leftJoinAndSelect('posts.categories', 'categories')
      .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
      .leftJoinAndSelect('posts.ward', 'ward')
      .leftJoinAndSelect('ward.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('posts.postImages', 'postImages')
      .leftJoinAndSelect('posts.jobTypeData', 'jobTypeData')
      .leftJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
      .leftJoinAndSelect('posts.companyResource', 'companyResource')
      // .leftJoinAndSelect('companyResource', 'companyResource')
      .where(`posts.status = 1`)
      .andWhere(`(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`)
      .andWhere(
        `(posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`,
      )
  );
}
