import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PostMedia } from '../entities/post-media.entity';
import { PostMediasSerialization } from '../serialization/post-medias.serialization';

export class PostMediaDetailInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((postMedia: PostMedia) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = new PostMediasSerialization(postMedia, lang);

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
