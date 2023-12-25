import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CategoryDescriptionTemplateSerialization } from '../serialization/category-description-templates.serialization';

export class DetailCategoryDescriptionInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((template: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = new CategoryDescriptionTemplateSerialization(
          template,
          lang,
        );

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
