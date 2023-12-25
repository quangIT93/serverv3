import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { CompanyDescriptionTemplate } from '../entities/company-description-template.entity';
import { CompanyDescriptionTemplateSerialization } from '../serialization/company-description-template.serialization';

export class CompanyDescriptionTemplateInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((template: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = template?.data?.map((data: CompanyDescriptionTemplate) => {
          const template = new CompanyDescriptionTemplateSerialization(
            data,
            lang,
          );
          return template;
        });

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
