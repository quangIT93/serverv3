import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ProfilesSkill } from "../entities/profiles-skill.entity";
import { ProfileSkillSerialization } from "../serialization/profiles-skill.serialization";

export class ProfileSkillInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
              (profilesSkill: ProfilesSkill[]) => {
                const lang = _context.switchToHttp().getRequest().lang;
                return {
                  status: _context.switchToHttp().getResponse().statusCode,
                  data: {
                    total: profilesSkill.length,
                    profilesSkills: profilesSkill.map((skill) =>
                      Object.assign(
                        new ProfileSkillSerialization(skill, lang),
                      ),
                    ),
                  },
      
                  message: _context.switchToHttp().getResponse().statusMessage,
                };
              },
            ),
          );
    }
  }