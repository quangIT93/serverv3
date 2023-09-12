import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesCourseDto } from './dto/create-profiles-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

      const result = await this.profilesCourseRepository.delete({
        id: In(idArray),
        accountId,
      });

      if (result && typeof result.affected === 'number' && ( result.affected === 0 || result.affected < idArray.length )) {
        throw new BadRequestException('Some profiles course were not deleted');
      }
    } catch (error) {
      throw error;
    }
  }
}
