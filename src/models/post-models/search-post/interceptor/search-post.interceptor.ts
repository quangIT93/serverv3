import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { Post } from '../../posts/entities';
import { PostNormally } from '../../posts/serialization/normally-post.class';
export class SearchPostInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const lang = _context.switchToHttp().getRequest()['lang'];
    return next.handle().pipe(
      map((item: any) => {
        const data = item?.result?.map((data: Post) => {
          const postNormally = new PostNormally(data, lang);

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
