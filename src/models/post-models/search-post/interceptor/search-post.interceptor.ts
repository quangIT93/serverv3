import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { SearchPostSerialization } from '../serialization/search-post.serialization';
import { Post } from '../../posts/entities';
export class SearchPostInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const lang = _context.switchToHttp().getRequest()['lang'];
    return next.handle().pipe(
      map((item: any) => {
        const data = item?.result?.map((data: Post) => {
          const academicSerialization = new SearchPostSerialization(data, lang);
          return academicSerialization;
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
