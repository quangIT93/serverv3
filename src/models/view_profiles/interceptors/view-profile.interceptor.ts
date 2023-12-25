import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ViewProfileSerialization } from '../serialization/view-profile.serialization';
import { ViewProfile } from '../entities/view_profile.entity';

export class ViewProfileInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((viewProfile: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = viewProfile?.data?.map((view: ViewProfile) => {
          const data = new ViewProfileSerialization(view, lang);
          return data;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: viewProfile.total,
            data,
            is_over: viewProfile.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
