import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PostMedia } from '../entities/post-media.entity';
import { PostMediasSerialization } from '../serialization/post-medias.serialization';

export class PostMediasInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((postMedia: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = postMedia?.data?.map((data: PostMedia) => {
          return new PostMediasSerialization(data, lang);
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: postMedia.total,
            data,
            is_over: postMedia.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
