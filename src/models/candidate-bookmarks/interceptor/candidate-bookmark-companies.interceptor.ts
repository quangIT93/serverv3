import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CandidateBookmark } from '../entities/candidate-bookmark.entity';
import { CandidateBookmarkCompaniesSerialization } from '../serialization/candidate-bookmark-companies.serialization';

export class CandidateBookmarkedCompaniesInterceptor
  implements NestInterceptor
{
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((candidateBookmark: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = candidateBookmark?.data?.map((data: CandidateBookmark) => {
          const candidateSerialization =
            new CandidateBookmarkCompaniesSerialization(data, lang);
          return candidateSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: candidateBookmark.total,
            candidateBookmarks: data,
            is_over: candidateBookmark.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
