import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationDetailSerialization } from '../serialization/communication-detail.serialization';

export class CommunicationDetailInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: Communication) => {
        const lang = _context.switchToHttp().getRequest().lang;

        if (!communication) return;

        const communicationDetailSerialization =
          new CommunicationDetailSerialization(communication, lang);
        Object.assign(communicationDetailSerialization, communication);

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: communicationDetailSerialization,
          message: _context.switchToHttp().getResponse().SstatusMessage,
        };
      }),
    );
  }
}
