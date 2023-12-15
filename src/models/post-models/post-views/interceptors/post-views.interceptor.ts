import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PostView } from '../entities/post-view.entity';
import { PostNormally } from '../../posts/serialization/normally-post.class';
  @Injectable()
  export class PostViewInterceptor implements NestInterceptor {
    async intercept(
      _context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const lang = _context.switchToHttp().getRequest()['lang'];

      return next.handle().pipe(
        map((posts: PostView[]) => {
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
            };
          }
          const data = posts.map((post: PostView) => {
            const postNormally = new PostNormally(post.post, lang);
  

            postNormally.bookmarked = post.post.bookmarks ? post.post.bookmarks.length > 0 : false;
            return postNormally;
          });
  
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            message: _context.switchToHttp().getResponse().statusMessage,
            is_over: isOver,
            data,
          };
        }),
      );
    }
  }
  