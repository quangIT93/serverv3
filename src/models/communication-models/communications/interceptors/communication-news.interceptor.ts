import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationSerialization } from '../serialization/communication.serialization';

export class CommunicationNewsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: any) => {
        const lang = _context.switchToHttp().getRequest().lang;
        
        if (!communication || !communication.data) 
        {
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            total: communication.total,
            data: [],
            message: _context.switchToHttp().getResponse().statusMessage,
          };
        }

        if (communication.length > _context.switchToHttp().getRequest().checkOverLimit ) {
          communication.pop();
        }

        // console.log('communication', communication);

        const data = communication?.data?.map((communication: Communication) => {
          const communicationSerialization = new CommunicationSerialization(
            communication,
            lang,
          );
          return communicationSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          total: communication.total,
          data: data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
