import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    // console.log('Request...');
    // console.log(request);
    const ip = request['ips'].length ? request['ips'][0] : request['ip'] || '';
    const x_forwarded_for = request.get('x-forwarded-for') || request.get('X-Forwarded-For') || '';
    const { method, baseUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} - ${ip} - ${x_forwarded_for.split(',')[0]}`,
      );
    });

    next();
  }
}