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
        educations,
        gender,
        limit,
        page,
      } = query;

      const candidates = this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.childCategories', 'childCategory')
        .leftJoinAndSelect('profile.profilesEducations', 'profilesEducations');

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

      if (educations && educations.length > 0) {
        candidates.andWhere(
          'profilesEducations.academicTypeId IN (:...educations)',
          {
            educations: educations.map((i) => +i),
          },
        );
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

      const data = await candidates
        .where({ isSearch: 1 })
        .take(limit)
        .skip(page * limit)
        .getMany();

      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }
}
