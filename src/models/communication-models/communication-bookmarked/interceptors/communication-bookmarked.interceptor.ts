import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommunicationBookmarked } from '../entities/communication-bookmarked.entity';
import { CommunicationBookmarkedSerialization } from '../serialization/communication-bookmarked.serialization';

export class CommunicationBookmarkedInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communicationBookmarked: CommunicationBookmarked[]) => {

        const data = communicationBookmarked?.map((communicationBookmarked: CommunicationBookmarked) => {
          const communicationBookmarkedSerialization = new CommunicationBookmarkedSerialization(
            communicationBookmarked
          );
          return communicationBookmarkedSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
