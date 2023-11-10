import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { CompanyRatingSerialization } from '../serialization/company-rating.serialization';

export class CompanyRatingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((companyRating: any) => {
        const lang = context.switchToHttp().getRequest().lang;

        const data = new CompanyRatingSerialization(companyRating, lang);

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data,
          message: context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
