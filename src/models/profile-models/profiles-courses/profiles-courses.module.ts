import { Module } from '@nestjs/common';
import { ProfilesCoursesService } from './profiles-courses.service';
import { ProfilesCoursesController } from './profiles-courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesCourse } from './entities/profiles-course.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesCourse]),
    JwtAccessTokenModule
  ],
  controllers: [ProfilesCoursesController],
  providers: [ProfilesCoursesService],
  exports: [ProfilesCoursesService]
})
export class ProfilesCoursesModule {}
