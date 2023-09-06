import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ProfilesCourse } from "../entities/profiles-course.entity";
import { ProfileCourseSerialization } from "../serialization/profiles-courses.serialization";

export class ProfileCoursesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
              (profilesCourse: ProfilesCourse[]) => {
                const lang = _context.switchToHttp().getRequest().lang;
                return {
                  status: _context.switchToHttp().getResponse().statusCode,
                  data: {
                    total: profilesCourse.length,
                    profilesCourses: profilesCourse.map((skill) =>
                      Object.assign(
                        new ProfileCourseSerialization(skill, lang),
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