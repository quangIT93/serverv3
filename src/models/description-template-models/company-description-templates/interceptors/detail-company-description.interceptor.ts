import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { CompanyDescriptionTemplate } from '../entities/company-description-template.entity';
import { CompanyDescriptionTemplateSerialization } from '../serialization/company-description-template.serialization';

export class DetailCompanyDescriptionInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((template: CompanyDescriptionTemplate) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = new CompanyDescriptionTemplateSerialization(
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
