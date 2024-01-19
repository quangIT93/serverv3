import { BookmarksService } from './../../../bookmarks/bookmarks.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { Post } from '../../posts/entities';
import { PostNormally } from '../../posts/serialization/normally-post.class';
@Injectable()
export class SearchPostInterceptor implements NestInterceptor {
  constructor(private bookmarksService: BookmarksService) {}
  async intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const lang = _context.switchToHttp().getRequest()['lang'];

    const user_id = _context.switchToHttp().getRequest()['user']?.id;

    let bookmarks: number[] = [];

    if (user_id) {
      await this.bookmarksService.findByUserId(user_id).then((res) => {
        for (let i = 0; i < res.length; i++) {
          bookmarks.push(res[i].postId);
        }
      });
    }

    return next.handle().pipe(
      map((item: any) => {
        console.log('item', item);

        const data = item?.result?.map((data: Post) => {
          const postNormally = new PostNormally(data, lang);
          if (bookmarks.includes(postNormally.id)) {
            postNormally.bookmarked = true;
          }

          return postNormally;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: item?.total,
            posts: data,
            is_over: item?.is_over,
          },
        };
      }),
    );
  }
}
