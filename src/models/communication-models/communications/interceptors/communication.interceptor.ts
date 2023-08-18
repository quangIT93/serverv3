import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationSerialization } from '../serialization/communication.serialization';

export class CommunicationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (communication: {
          news: Communication[];
          workingStory: Communication[];
        }) => {
          const lang = _context.switchToHttp().getRequest().lang;

          console.log('CommunicationInterceptor: intercept: lang: ' + lang);
          console.log(
            'CommunicationInterceptor: intercept: communication: ' +
            JSON.stringify(communication),
          );

          const { news, workingStory } = communication;

          return {
            status: _context.switchToHttp().getResponse().statusCode,
            data: {
              news: news.map((item) => {
                return Object.assign(
                  new CommunicationSerialization(item, lang),
                );
              }),
              workingStory: workingStory.map((item) => {
                return Object.assign(
                  new CommunicationSerialization(item, lang),
                );
              }),
            },

            message: _context.switchToHttp().getResponse().statusMessage,
          };
        },
      ),
    );
  }
}
