import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { PostNormally } from '../serialization/normally-post.class';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
@Injectable()
export class PostNormallyInterceptor implements NestInterceptor {
    // 84264,84215,84198,84089,83971,84433,84432,84431,84430,84429,84428
    constructor(
        private bookmarksService: BookmarksService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const user_id = _context.switchToHttp().getRequest()['user']?.id;

        let bookmarks: number[] = [];

        if (user_id) {
            await this.bookmarksService.findByUserId(user_id)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    bookmarks.push(res[i].postId);
                }
            })
        }

        return next.handle().pipe(
            map((posts: Post[]) => {
                const length = posts.length;
                let isOver = true;

                if (length === _context.switchToHttp().getRequest().limit) {
                    isOver = false;
                    posts.pop();                
                }
                
                if (length === 0) {
                    return {
                        status: _context.switchToHttp().getResponse().statusCode,
                        data: [],
                        message: _context.switchToHttp().getResponse().statusMessage,
                        is_over: true,
                    }
                }
                const data = posts.map((post: Post) => {
                    const postNormally = new PostNormally(post, lang);

                    if (bookmarks.includes(postNormally.id)) {
                        postNormally.bookmarked = true;
                    }

                    return postNormally;
                });

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    message: _context.switchToHttp().getResponse().statusMessage,
                    is_over: isOver,
                    data,
                }
            }),
        );
    }
}
