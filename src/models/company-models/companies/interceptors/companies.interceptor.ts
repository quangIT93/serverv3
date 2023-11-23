import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Company } from '../entities/company.entity';
import { CompaniesSerialization } from '../serialization/companies.serialization';

export class CompaniesInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((company: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        console.log("data", company)

        const data = company?.data.map((data: Company) => {
          return new CompaniesSerialization(data, lang);
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: company.total,
            companies: data,
            is_over: company.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
