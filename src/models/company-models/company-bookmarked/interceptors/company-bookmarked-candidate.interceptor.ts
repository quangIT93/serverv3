import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CompanyBookmarked } from '../entities/company-bookmarked.entity';
import { CompanyBookmarkedCandidateSerialization } from '../serialization/company-bookmarked-candidate.serialization';

export class CompanyBookmarkedCandidateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((companyBookmarked: any) => {
        const lang = context.switchToHttp().getRequest().lang;

        if (!companyBookmarked || !companyBookmarked.data) return null;

        const data = companyBookmarked?.data.map(
          (bookmarked: CompanyBookmarked) => {
            return new CompanyBookmarkedCandidateSerialization(
              bookmarked,
              lang,
            );
          },
        );

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data: {
            total: companyBookmarked.total,
            bookmarkedCompany: data,
            is_over: companyBookmarked.is_over,
          },
          message: context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
