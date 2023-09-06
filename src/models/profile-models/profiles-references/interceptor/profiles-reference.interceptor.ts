import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ProfilesReference } from '../entities/profiles-reference.entity';
import { ProfileReferenceSerialization } from '../serializtion/profile-reference.serialization';

export class ProfileReferenceInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((profilesReference: ProfilesReference[]) => {
        const lang = _context.switchToHttp().getRequest().lang;
        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: profilesReference.length,
            profilesReferences: profilesReference.map((skill) =>
              Object.assign(new ProfileReferenceSerialization(skill, lang)),
            ),
          },

          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
