import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { PostDetailSeialization } from '../serialization/postsDetail.serialization';

@Injectable()
export class PostDetailInterceptor implements NestInterceptor {

    constructor(
        private bookmarksService: BookmarksService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const user_id = _context.switchToHttp().getRequest()['user']?.id;

        let bookmarked: boolean;

        if (user_id) {
            await this.bookmarksService.findByPostIdAndUserId(_context.switchToHttp().getRequest().params.id, user_id)
            .then((res) => {
                bookmarked = res ? true : false;
            })
        }

        return next.handle().pipe(
            map((posts: Post) => {


                const data = new PostDetailSeialization(posts, lang);

                data.bookmarked = bookmarked || false;
               
                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    message: _context.switchToHttp().getResponse().statusMessage,
                    data,
                }
            }),
        );
    }
}
