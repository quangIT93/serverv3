import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesCourseDto } from './dto/create-profiles-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesCourse } from './entities/profiles-course.entity';

@Injectable()
export class ProfilesCoursesService {
  constructor(
    @InjectRepository(ProfilesCourse)
    private readonly profilesCourseRepository: Repository<ProfilesCourse>,
  ) {}
  async create(createProfilesCourseDto: CreateProfilesCourseDto) {
    try {
      const newProfilesEntity = this.profilesCourseRepository.create(
        createProfilesCourseDto,
      );

      return await this.profilesCourseRepository.save(newProfilesEntity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesCourseRepository.find({
        where: { accountId: id },
      });
    } catch (error) {
      throw error;
    }
  }

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const query = this.profilesCourseRepository
        .createQueryBuilder('profiles_courses')
        .where(
          'profiles_courses.id IN (:...ids) AND profiles_courses.accountId = :accountId',
          {
            ids: idArray,
            accountId,
          },
        );

      const dataProfileCourses = await query.getMany();

      if (dataProfileCourses.length === 0) {
        throw new BadRequestException('Profile course not found');
      }

      await this.profilesCourseRepository.remove(dataProfileCourses);

      return 'Profile course records removed successfully';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const dataProfileCourse = await this.profilesCourseRepository.findOne({
        where: { id },
      });

      if (!dataProfileCourse) {
        throw new Error('Profile course not found');
      }

      await this.profilesCourseRepository.remove(dataProfileCourse);
    } catch (error) {
      throw error;
    }
  }
}
