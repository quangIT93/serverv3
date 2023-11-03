import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CompanyBookmarked } from '../entities/company-bookmarked.entity';
import { CompanyBookmarkedSerialization } from '../serialization/company-bookmarked.serialization';

export class CompanyBookmarkedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((companyBookmarked: any) => {
        const lang = context.switchToHttp().getResponse().lang;
        console.log('First');
        if (!companyBookmarked || !companyBookmarked.data) return null;

        const data = companyBookmarked?.data.map(
          (companyBookmarked: CompanyBookmarked) => {
            return new CompanyBookmarkedSerialization(companyBookmarked, lang);
          },
        );

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data: {
            total: companyBookmarked.total,
            bookmarkedCompany: data,
            is_over: companyBookmarked.is_over,
          },
        };
      }),
    );
  }
}
