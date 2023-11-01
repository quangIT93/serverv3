import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected override async getTracker(
    req: Record<string, any>,
  ): Promise<string> {
    return (
      req['headers']['x-forwarded-for']?.split(',')[0] ||
      req['headers']['X-Forwarded-For']?.split(',')[0] ||
      req['ip']
    );
  }
}
