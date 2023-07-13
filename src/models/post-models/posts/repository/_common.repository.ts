import { Repository } from "typeorm";
import { Post } from "../entities";

export function InitQuerySelectNormallyPost(respository: Repository<Post>) {
    return respository
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
    .where(`posts.status = 1`)
    .andWhere(`(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`)
    .andWhere(`(posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`)
}