import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CompanyRating } from '../entities/company-rating.entity';
import { CompanyRatingsSerialization } from '../serialization/company-ratings.serialization';

export class CompanyRatingsInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((companyRatings: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = companyRatings?.data.map((data: CompanyRating) => {
          return new CompanyRatingsSerialization(data, lang);
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: companyRatings.total,
            companyRatings: data,
            averageRated: companyRatings.averageRated,
          },
          message: _context.switchToHttp().getRequest().statusMessage,
        };
      }),
    );
  }
}
