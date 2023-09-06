import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ProfileLanguage } from '../entities/profile-language.entity';
import { ProfileLanguageSerialization } from '../serialization/profiles-language.serialization';

export class ProfileLanguageInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((profileLanguage: ProfileLanguage[]) => {
        const lang = _context.switchToHttp().getRequest().lang;
        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: profileLanguage.length,
            profileLanguages: profileLanguage.map((skill) =>
              Object.assign(new ProfileLanguageSerialization(skill, lang)),
            ),
          },

          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
