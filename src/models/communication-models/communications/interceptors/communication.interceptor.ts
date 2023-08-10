import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationSerialization } from '../serialization/communication.serialization';

export class CommunicationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: Communication[]) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = communication.map((communication: Communication) => {
          const communicationSerialization = new CommunicationSerialization(
            communication,
            lang,
          );
          return communicationSerialization;
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
