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
        .createQueryBuilder('profiles')
        .leftJoinAndSelect('profiles.childCategories', 'childCategory')
        .leftJoinAndSelect('profiles.profilesEducations', 'profilesEducations');

      if (addresses) {
        candidates.andWhere('profiles.address IN (:...addresses)', {
          addresses: Array.isArray(addresses)
            ? addresses.map((item) => +item)
            : [+addresses],
        });
      }

      if (categories) {
        candidates.andWhere('childCategory.id IN (:...categories)', {
          categories: Array.isArray(categories)
            ? categories.map((item) => +item)
            : [+categories],
        });
      }

      if (educations) {
        candidates.andWhere(
          'profilesEducations.academicTypeId IN (:...educations)',
          {
            educations: Array.isArray(educations)
              ? educations.map((item) => +item)
              : [+educations],
          },
        );
      }

      if (ageMin) {
        const yearMIn = new Date().getFullYear() - ageMin;
        const birthdayMin = +new Date(yearMIn + 1, 1, 1);
        candidates.andWhere('profiles.birthday <= :birthdayMin', {
          birthdayMin,
        });
      }

      if (ageMax) {
        const yearMax = +new Date().getFullYear() - ageMax;
        const birthdayMax = +new Date(yearMax, 1, 1);
        candidates.andWhere('profiles.birthday >= :birthdayMax', {
          birthdayMax,
        });
      }

      if (gender) {
        candidates.andWhere('profiles.gender = :gender', {
          gender,
        });
      }

      return await candidates
        .andWhere({ isSearch: 0 })
        .take(limit)
        .skip(page * limit)
        .getMany();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }
}
