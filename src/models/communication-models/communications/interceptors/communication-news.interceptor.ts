import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationHiJobNewsSerialization } from '../serialization/communication-hijob-news.serialization';

export class CommunicationNewsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: Communication[]) => {
        const lang = _context.switchToHttp().getRequest().lang;
        
        if (!communication) return null;

        if (communication.length > _context.switchToHttp().getRequest().checkOverLimit ) {
          communication.pop();
        }

        // console.log('communication', communication);

        const data = communication?.map((communication: Communication) => {
          const communicationSerialization = new CommunicationHiJobNewsSerialization(
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
