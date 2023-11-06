import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Company } from '../entities/company.entity';
import { CompanySerialization } from '../serialization/company.serialization';

export class CompanyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((company: Company) => {
        const lang = context.switchToHttp().getRequest().lang;
        const data = new CompanySerialization(company, lang);

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data,
          message: context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
