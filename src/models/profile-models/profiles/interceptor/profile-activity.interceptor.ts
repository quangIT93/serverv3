import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
// import { ProfileDetailCandidateSerialization } from '../serialization/profile-detail-candidate.serialization';

export class ProfileActivityLogInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((activities: any) => {


        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: activities,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
