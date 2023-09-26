import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Profile } from '../profile-models/profiles/entities';
import { FilterCandidatesDto } from './dto/filter-candidates.dto';

@Injectable()
export class CvFilterService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async filterCandidatesWithCondition(query: FilterCandidatesDto) {
    try {
      const {
        addresses,
        ageMax,
        ageMin,
        categories,
        // educations,
        gender,
      } = query;

      const candidates = this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.childCategories', 'childCategory')
        .leftJoinAndSelect('profile.profilesEducations', 'education');

      if (addresses && addresses.length > 0) {
        candidates.andWhere('profile.address IN (:...addresses)', {
          addresses,
        });
      }

      if (categories && categories.length > 0) {
        candidates.andWhere('childCategory.id IN (:...categories)', {
          categories,
        });
      }

      if (ageMin) {
        const yearMIn = new Date().getFullYear() - ageMin;
        const birthdayMin = +new Date(yearMIn + 1, 1, 1);
        candidates.andWhere('profile.birthday <= :birthdayMin', {
          birthdayMin,
        });
      }

      if (ageMax) {
        const yearMax = +new Date().getFullYear() - ageMax;
        const birthdayMax = +new Date(yearMax, 1, 1);
        candidates.andWhere('profile.birthday >= :birthdayMax', {
          birthdayMax,
        });
      }

      if (gender) {
        candidates.andWhere('profile.gender = :gender', {
          gender,
        });
      }

      return await candidates.getMany();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }
}
