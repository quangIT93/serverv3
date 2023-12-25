import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CategoryDescriptionTemplateSerialization } from '../serialization/category-description-templates.serialization';
import { CategoryDescriptionTemplate } from '../entities/category-description-template.entity';

export class CategoryDescriptionTemplateInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((template: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = template?.data?.map(
          (data: CategoryDescriptionTemplate) => {
            const template = new CategoryDescriptionTemplateSerialization(
              data,
              lang,
            );
            return template;
          },
        );

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: template.total,
            data,
            is_over: template.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
