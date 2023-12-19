import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CompanyViewCandidateSerialization } from '../serialization/company-view-candidate.serialization';
import { CompanyView } from '../entities/company-view.entity';

export class CompanyViewCandidateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((companyView: any) => {
        const lang = context.switchToHttp().getRequest().lang;

        if (!companyView || !companyView.data) return null;

        const data = companyView?.data.map((companyView: CompanyView) => {
          return new CompanyViewCandidateSerialization(companyView, lang);
        });

        return {
          status: context.switchToHttp().getResponse().statusCode,
          data: {
            total: companyView.total,
            data,
            is_over: companyView.is_over,
          },
          message: context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
