import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Profile } from "../entities";
import { ProfileDetailCandidateSerialization } from "../serialization/profile-detail-candidate.serialization";

export class ProfileDetailInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((profile: Profile) => {
          const lang = _context.switchToHttp().getRequest().lang;
          const unclock = _context.switchToHttp().getRequest().unclock;
          const profileSerialization = new ProfileDetailCandidateSerialization(profile, lang, unclock);
          Object.assign(profileSerialization, profile);
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            data: profileSerialization,
            message: _context.switchToHttp().getResponse().statusMessage,
          };
        }),
      );
    }
  }
  