// import { Exclude } from 'class-transformer';
import { HotTopic } from '../entities/hot-posts.entity';
// import generateQuery from 'src/models/post-models/posts/helper/generateQuery.hotopic';
// import { HotTopicQueriesDto } from 'src/models/post-models/posts/dto/hot-topic-queries.dto';
// import { QUERY_LIST_CHILDREN_CATEGORY_ID } from 'src/common/constants';

export class HotTopicSerializer {
    id!: number;

    title!: string;

    type!: number;

    image!: string;

    webImage!: string;

    themeId!: number;

    // @Exclude({ toPlainOnly: true })
    query!: any;

    count!: number;

    api!: string;

    detailId!: number;

    constructor(partial: Partial<HotTopicSerializer>) {
        // console.log(partial);
        Object.assign(this, partial);
    }

    static from(dto: Partial<HotTopicSerializer>) {
        return new HotTopicSerializer(dto);
    }

    static fromEntity(entity: HotTopic) {
        return this.from({
            id: entity.id,
            type: entity.type,
            title: entity.title,
            image: entity.image || entity.webImage,
            themeId: entity.themeId,
            detailId: entity.detailId,
            query: [
                {
                  "listChildrenCategoryId": "394,370"
                }
              ],
            api: `/api/v3/posts/topic/${entity.id}`,
        });
    }
}
