import { Repository } from 'typeorm';
import { Post } from '../entities';
import { NewestPostQueriesDto } from '../dto/newest-queries.dto';

/**
 * @description
 * This class is used to build query for posts
 *
 * @return
 *
 */
export class PostsQueryBuilder {
  repository: Repository<Post>;

  fields: string[] = [
    'posts.id',
    'posts.title',
    'posts.accountId',
    'posts.companyName',
    'posts.address',
    'posts.salaryMin',
    'posts.salaryMax',
    'posts.moneyType',
    'posts.createdAt',
    'posts.createdAtDate',
    'posts.companyResourceId',
  ];

  statusCondition = `posts.status = 1`;
  expiredDateCondition = `(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`;
  endDateCondition = `(posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`;

  HIJOB_RESOURCE_ID = 2;

  constructor(repository: Repository<Post>, fields?: string[]) {
    this.repository = repository;
    if (fields) {
      this.fields = this.fields.concat(fields);
    }
  }

  /**
   * @description
   * init query builder
   */
  init() {
    return this.repository.createQueryBuilder('posts').select(this.fields);
  }

  /**
   * @description
   * Get newest posts
   * - Sort by createdAtDate desc
   * -> Sort by fileds (Posts from company resource id  from Hijob will be first)
   * -> Sort by createdAt desc
   *
   * @param page
   * @param limit
   *
   */
  async getNewestPosts(
    _page: number,
    limit: number,
    _queries?: NewestPostQueriesDto,
    _threshold?: number,
  ): Promise<Post[]> {
    // let lastCompanyResourceId = null;

    // if (_threshold) {
    //     lastCompanyResourceId = await this.repository
    //         .createQueryBuilder('posts')
    //         .select(['posts.companyResourceId'])
    //         .where(`posts.id = :id`, {
    //             id: _threshold,
    //         })
    //         .getOne();
    // }

    //  USE INDEX(rev_id_idx)
    const listIds = await this.repository.query(`
            SELECT
                posts.id
            FROM posts USE INDEX(descending_post_id_idx)
            INNER JOIN wards ON wards.id = posts.ward_id ${
              _queries?.districtIds
                ? `AND wards.district_id IN (${_queries.districtIds})`
                : ''
            }
            ${
              _queries?.provinceId
                ? `INNER JOIN districts ON districts.id = wards.district_id 
                AND districts.province_id = ${_queries.provinceId}`
                : ''
            }
            INNER JOIN posts_categories ON posts_categories.post_id = posts.id ${
              _queries?.childrenCategoryId
                ? `AND posts_categories.category_id IN (${_queries.childrenCategoryId})`
                : ''
            }
            ${
              _queries?.parentCategoryId
                ? `INNER JOIN child_categories ON child_categories.id = posts_categories.category_id 
                AND child_categories.parent_category_id = ${_queries.parentCategoryId}`
                : ''
            }
            WHERE posts.status = 1
                AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
                AND (posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURDATE()) * 1000)
                ${_threshold ? `AND posts.id < ${_threshold}` : ''}
            GROUP BY posts.id
            ORDER BY posts.id DESC
            LIMIT ${limit}
        `);
    // ORDER BY posts.id DESC
    // ORDER BY date_format(posts.created_at,'%y-%m-%d') DESC, posts.is_inhouse_data,posts.id desc
    // , field(company_resource_id,2) desc, posts.id desc
    // AND ${lastCompanyResourceId ? lastCompanyResourceId.companyResourceId  === 2
    //     ? `(posts.company_resource_id != 2 OR posts.id < ${_threshold})`
    //     : `(posts.id < ${_threshold} AND posts.company_resource_id != 2)` : '1=1'
    // }

    if (!listIds.length) {
      return [];
    }

    return this.init()
      .innerJoinAndSelect('posts.categories', 'categories')
      .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
      .innerJoinAndSelect('posts.ward', 'ward')
      .innerJoinAndSelect('ward.district', 'district')
      .innerJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('posts.postImages', 'postImages')
      .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
      .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
      .innerJoinAndSelect('posts.companyResource', 'companyResource')
      .where(`posts.id IN (:...ids)`, {
        ids: listIds.map((item: any) => item.id),
      })
      .orderBy(
        `FIELD(posts.id, ${listIds.map((item: any) => item.id).join(',')})`,
      )
      .getMany();
  }

  async getNewestPostsV2(
    _page: number,
    limit: number,
    _queries?: NewestPostQueriesDto,
    _threshold?: number,
  ): Promise<Post[]> {
    console.log('page, limit', _page, limit);
    const listIds = await this.repository.query(`
            SELECT
                posts.id
            FROM posts USE INDEX(descending_post_id_idx)
            INNER JOIN wards ON wards.id = posts.ward_id ${
              _queries?.districtIds
                ? `AND wards.district_id IN (${_queries.districtIds})`
                : ''
            }
            ${
              _queries?.provinceId
                ? `INNER JOIN districts ON districts.id = wards.district_id 
                AND districts.province_id = ${_queries.provinceId}`
                : ''
            }
            INNER JOIN posts_categories ON posts_categories.post_id = posts.id ${
              _queries?.childrenCategoryId
                ? `AND posts_categories.category_id IN (${_queries.childrenCategoryId})`
                : ''
            }
            ${
              _queries?.parentCategoryId
                ? `INNER JOIN child_categories ON child_categories.id = posts_categories.category_id 
                AND child_categories.parent_category_id = ${_queries.parentCategoryId}`
                : ''
            }
            WHERE posts.status = 1
                AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
                AND (posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURDATE()) * 1000)
            GROUP BY posts.id
            ORDER BY date_format(posts.created_at,'%y-%m-%d') DESC, posts.is_inhouse_data,posts.id desc
            LIMIT ${limit * _page},${limit}
        `);

    if (!listIds.length) {
      return [];
    }

    return this.init()
      .innerJoinAndSelect('posts.categories', 'categories')
      .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
      .innerJoinAndSelect('posts.ward', 'ward')
      .innerJoinAndSelect('ward.district', 'district')
      .innerJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('posts.postImages', 'postImages')
      .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
      .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
      .innerJoinAndSelect('posts.companyResource', 'companyResource')
      .where(`posts.id IN (:...ids)`, {
        ids: listIds.map((item: any) => item.id),
      })
      .orderBy(
        `FIELD(posts.id, ${listIds.map((item: any) => item.id).join(',')})`,
      )
      .getMany();
  }
}

// let query = this.init()
// .innerJoinAndSelect('posts.categories', 'categories')
// .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
// .innerJoinAndSelect('posts.ward', 'ward')
// .innerJoinAndSelect('ward.district', 'district')
// .innerJoinAndSelect('district.province', 'province')
// .leftJoinAndSelect('posts.postImages', 'postImages')
// .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
// .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
// .innerJoinAndSelect('posts.companyResource', 'companyResource')
// .where(`posts.status = 1`)
// .andWhere(`(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`)
// .andWhere(`(posts.endDate IS NULL OR posts.endDate >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`)

// if (_queries?.parentCategoryId) {
//     query = query.andWhere(`parentCategory.id = :parentCategoryId`, {
//         parentCategoryId: _queries.parentCategoryId,
//     });
// }

// if (_queries?.childrenCategoryId) {
//     query = query.andWhere(`categories.id IN (:...childrenCategoryId)`, {
//         childrenCategoryId: _queries.childrenCategoryId,
//     });
// }

// if (_queries?.provinceId) {
//     query = query.andWhere(`province.id = :provinceId`, {
//         provinceId: _queries.provinceId,
//     });
// }

// if (_queries?.districtIds) {
//     query = query.andWhere(`district.id IN (:...districtIds)`, {
//         districtIds: _queries.districtIds,
//     });
// }

// if (_threshold) {
//     query = query.andWhere(`posts.id < :threshold`, {
//         threshold: _threshold,
//     });
// }

// query = query.orderBy(`posts.createdAt`, 'DESC');

// return query.take(limit).getMany();
