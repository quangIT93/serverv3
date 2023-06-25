import { QUERY_CHILDREN_CATEGORY_ID, QUERY_IS_REMOTELY, QUERY_IS_SHORT_TIME_JOBS, QUERY_PARENT_CATEGORY_ID } from "src/common/constants";
import { HotTopic } from "../entities/hot-posts.entity";

export class HotTopicSerializer {
    id!: number;
    title!: string;
    type!: number;
    image!: string;
    themeId!: number;
    query!: string[];
    count!: number;
    api!: string;

    constructor(partial: Partial<HotTopicSerializer>) {
        Object.assign(this, partial);
    }

    static from(dto: Partial<HotTopicSerializer>) {
        return new HotTopicSerializer(dto);
    }

    static fromEntity(entity: HotTopic) {

        let query: any[] = [];

        switch (entity.type) {
            case 1:
                query.push({ [QUERY_IS_REMOTELY] : entity.detailId});
                break;
            case 2:
                query.push({[QUERY_PARENT_CATEGORY_ID]: entity.detailId});
                break;
            case 3:
                query.push({[QUERY_CHILDREN_CATEGORY_ID] : entity.detailId});
                break;
            case 4:
                query.push({[QUERY_IS_SHORT_TIME_JOBS] : entity.detailId});
                break;
            default:
                break;
        }

        return this.from({
            id: entity.id,
            type: entity.type,
            title: entity.title,
            image: entity.image,
            themeId: entity.themeId,
            query: query,
            api: `/api/v3/posts/topic/${entity.id}`
        });
    }
}