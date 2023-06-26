import {
    CallHandler,
    ExecutionContext,
    Injectable,
    // Logger,
    NestInterceptor,
} from '@nestjs/common';
import { PostNormally } from './../class/normallyPost.class';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
// import { timeToTextTransform } from 'src/common/helper/transform/timeToText.tranform';
// import { SalaryType } from 'src/models/salary-types/entities/salary-type.entity';
// import { MoneyType } from 'src/common/enum';
import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
// import { BUCKET_IMAGE_COMPANY_ICON, BUCKET_IMAGE_POST } from 'src/common/constants';
// import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';

@Injectable()
export class PostNormallyInterceptor implements NestInterceptor {

    constructor(
        private bookmarksService: BookmarksService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const user_id = _context.switchToHttp().getRequest()['user']?.id;

        // console.log(_context.switchToHttp().getRequest().checkOverLimit)

        let bookmarks: number[] = [];

        if (user_id) {
            await this.bookmarksService.findByUserId(user_id)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    bookmarks.push(res[i].postId);
                }
            })
        }

        // return if posts is empty


        return next.handle().pipe(
            map((posts: Post[]) => {

                const length = posts.length;

                posts.pop();                
                
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
                    return postNormally;
                });
                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    message: _context.switchToHttp().getResponse().statusMessage,
                    is_over: length < _context.switchToHttp().getRequest().checkOverLimit,
                    data,
                }
            }),

            
        );
    }
}
