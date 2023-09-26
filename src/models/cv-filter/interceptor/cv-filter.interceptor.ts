import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CVFilterSerializtion } from '../serialization/cv-filter.serialization';

export class CVFilterInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvFilter: any[]) => {
        const lang = _context.switchToHttp().getRequest().lang;
        const data = cvFilter?.map((data: Profile) => {
          const academicSerialization = new CVFilterSerializtion(data, lang);
          return academicSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
