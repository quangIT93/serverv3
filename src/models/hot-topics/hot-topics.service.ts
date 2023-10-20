import { GetHotTopicDto } from './dto/get-hot-topic.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotTopic } from './entities/hot-posts.entity';
import { Repository } from 'typeorm';
import { CreateHotTopicDto } from './dto/create-hot-topic.dto';


@Injectable()
export class HotTopicsService {
    constructor(
        @InjectRepository(HotTopic)
        private hotTopicRepository: Repository<HotTopic>
    ) { }

    async getHotTopics(dto: GetHotTopicDto): Promise<HotTopic[]> {

        const version = dto.version === 'app' ? 1 : 0;

        return this.hotTopicRepository
            .createQueryBuilder('hot_topics')
            .where('hot_topics.status = 1')
            .andWhere(`${dto.version === 'app' ? 'hot_topics.image IS NOT NULL' : '1=1'}`)
            .select([
                'hot_topics.id',
                // 'hot_topics.type',
                // 'hot_topics.detailId',
                'hot_topics.title',
                `${version === 1 ? 'hot_topics.image' : 'hot_topics.webImage'}`,
                'hot_topics.themeId',
                // 'hot_topics.order',
                // 'hot_topics.status',
                // 'hot_topics.createdAt',
                'hot_topics.query',
            ])
            .orderBy('hot_topics.order', 'ASC')
            .getMany()
    }

    async getHotTopicById(id: number): Promise<HotTopic | null> {
        return this.hotTopicRepository.findOne({
            where: {
                id
            }
        });
    }

    async createHotTopic(dto: CreateHotTopicDto): Promise<HotTopic> {
        return this.hotTopicRepository.save(dto);
    }

    async getQueryById(id: number): Promise<string> {
        const query = await this.hotTopicRepository.createQueryBuilder('hot_topics')
            .where('hot_topics.id = :id', { id })
            .select(['hot_topics.query'])
            .getRawOne();

        return query.query;
    }


}
