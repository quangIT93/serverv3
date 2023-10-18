import { Repository } from 'typeorm/repository/Repository';
import { InitQuerySelectNormallyPost } from './_common.repository';
import { Post } from '../entities';
function __init__(
    respository: Repository<Post>, 
    query: string, 
    options: {
        provinceId?: string;
    } = {},
) {
    let queryBuilder = InitQuerySelectNormallyPost(respository);
    if (query === "posts.createdAt") {
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

    console.log(queryBuilder.getQuery());

    return queryBuilder;


}

export function countByHotTopicQuery(
    respository: Repository<Post>,
    query: string,
) {
    const queryBuilder = __init__(respository, query);
    return queryBuilder.getCount();
}

export async function findByHotTopicQuery(
    respository: Repository<Post>,
    query: string,
    page: number,
    limit: number,
    province?: string,
) {

    const queryBuilder = __init__(respository, query, { provinceId: province });
    const data = await queryBuilder
        .orderBy('posts.createdAt', 'DESC')
        .skip(page * limit)
        .take(limit)
        .getMany();

    const total = await queryBuilder.getCount();

    return {
        data,
        total,
    };


}
