import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { PostsSerialization } from '../serialization/posts.serialization';

export class PostsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((posts: any) => {
        const lang = context.switchToHttp().getRequest().lang;

        const data = posts.data?.map((post: Post) => {
          return new PostsSerialization(post, lang);
        });

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data: {
            total: posts.total,
            posts: data,
            is_over: posts.is_over,
          },
        };
      }),
    );
  }
}
