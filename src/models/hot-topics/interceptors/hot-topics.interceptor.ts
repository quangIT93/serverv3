import {
    CallHandler,
    ExecutionContext,
    Injectable,
        // Logger,
    NestInterceptor,
} from '@nestjs/common';
// import { Observable, map } from 'rxjs';
// import { HotTopicSerializer } from '../serializations/hot-topics.serialization';
import { PostsService } from 'src/models/post-models/posts/posts.service';
import { Observable, map } from 'rxjs';
import { HotTopic } from '../entities/hot-posts.entity';
import { HotTopicSerializer } from '../serializations/hot-topics.serialization';
// import { ALL_QUERIES } from 'src/common/constants';

@Injectable()
export class HotTopicsInterceptor implements NestInterceptor {
    constructor(
        private postsService: PostsService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        // const lang = _context.switchToHttp().getRequest()['lang'];

        return next.handle().pipe(
            map(async (data: HotTopic[]) => {
                // console.log(data);
                const hotTopic = data.map((item) => {
                    return new HotTopicSerializer(item)
                });

                // count post
                return await Promise.all(hotTopic.map(async (item) => {
                    const count = await this.postsService.countByQuery(item.query);
                    item.count = count;
                    item.image = item.image || item.webImage;
                    item.query = [
                        {
                          "a": "394,370"
                        }
                      ]
                    return item;
                }));

                // console.log(hotTopic);

                // return hotTopic;
                
            }),
        );
    }
}
