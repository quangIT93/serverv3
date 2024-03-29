import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { UserService } from '../users/users.service';
import { NOT_ENOUGH_POINTS, NO_PERMISSION } from 'src/common/constants';
// import { CompaniesService } from '../company-models/companies/companies.service';
import { ViewedCompanyDto } from './dto/viewed-company.dto';
import { Company } from '../company-models/companies/entities/company.entity';

@Injectable()
export class ViewProfilesService {
  constructor(
    @InjectRepository(ViewProfile)
    private viewProfileRepository: Repository<ViewProfile>,
    private readonly userService: UserService,
    // private readonly companiesService: CompaniesService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createViewProfileDto: CreateViewProfileDto) {
    const user = await this.userService.findRoleById(
      createViewProfileDto.recruitId,
    );

    const company = await this.companyRepository.findOne({
      where: { accountId: createViewProfileDto.recruitId },
    });

    if (!company) {
      throw new BadRequestException('You have not company yet');
    }

    const TOTAL_IN_DAY =
      user && (user?.role === 3 || user?.role === 1) ? 20 : 3;

    if (user?.type !== 1) {
      throw new BadRequestException("Can't view profile", NO_PERMISSION);
    }

    const result = await this.viewProfileRepository
      .createQueryBuilder('view_profiles')
      .where('view_profiles.recruitId = :recruitId', {
        recruitId: createViewProfileDto.recruitId,
      })
      .andWhere('DATE(view_profiles.created_at) = :today', {
        today: new Date().toISOString().split('T')[0],
      })
      .getCount();

    if (result >= TOTAL_IN_DAY) {
      throw new BadRequestException('Not enough points', NOT_ENOUGH_POINTS);
    }

    const newEntity = this.viewProfileRepository.create(createViewProfileDto);

    const data = await this.viewProfileRepository.save(newEntity);

    if (data) {
      return TOTAL_IN_DAY - (result + 1);
    }

    return TOTAL_IN_DAY - result;
  }

  async getCompanyViewedByAccount(accountId: string, query: ViewedCompanyDto) {
    try {
      const queryRunner = this.viewProfileRepository
        .createQueryBuilder('view_profiles')
        .innerJoinAndSelect('view_profiles.company', 'company')
        .leftJoinAndSelect(
          'company.bookmarkedCompany',
          'bookmarkedCompany',
          'bookmarkedCompany.accountId = :accountId',
          { accountId },
        )
        .leftJoinAndSelect('company.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('company.posts', 'posts', 'posts.status = 1')
        .where('view_profiles.profileId = :accountId', { accountId });
      // .groupBy('view_profiles.recruitId');

      const total = await queryRunner.getCount();

      const data = await queryRunner
        .take(query.limit)
        .skip(query.page * query.limit)
        .getMany()
        .then((result) => {
          return result.map((view) => view.company);
        });

      const is_over = total < (query.page + 1) * query.limit;

      return {
        data,
        total,
        is_over,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLogViewProfile(accountId: string) {
    try {
      const queryRunner = this.viewProfileRepository
        .createQueryBuilder('view_profiles')
        .select('MONTH(view_profiles.created_at)', 'month')
        .addSelect('YEAR(view_profiles.created_at)', 'year')
        .addSelect('COUNT(view_profiles.id)', 'count')
        .where('view_profiles.profileId = :accountId', { accountId })
        .groupBy('month')
        .addGroupBy('year')
        .orderBy('year', 'DESC')
        .addOrderBy('month', 'DESC');
      const total = await queryRunner.getCount();

      const data = await queryRunner.getRawMany();

      return {
        data,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLogViewProfileByRecruiterId(recruiterId: string) {
    try {
      const queryRunner = this.viewProfileRepository
        .createQueryBuilder('view_profiles')
        .select('MONTH(view_profiles.created_at)', 'month')
        .addSelect('YEAR(view_profiles.created_at)', 'year')
        .addSelect('COUNT(view_profiles.id)', 'count')
        .where('view_profiles.recruitId = :recruiterId', { recruiterId })
        .groupBy('month')
        .addGroupBy('year')
        .orderBy('year', 'DESC')
        .addOrderBy('month', 'DESC');
      const total = await queryRunner.getCount();

      const data = await queryRunner.getRawMany();

      return {
        data,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfilesByRecruit(accountId: string, limit: number, page: number) {
    try {
      const candidates = this.viewProfileRepository
        .createQueryBuilder('viewProfiles')
        .where('viewProfiles.recruitId = :accountId', { accountId })
        .leftJoinAndSelect('viewProfiles.profile', 'profile')
        .leftJoinAndSelect('profile.childCategories', 'childCategory')
        .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory');

      const total = await candidates.getCount();
      const data = await candidates
        .take(limit ? limit : 20)
        .skip(page ? page * limit : 0)
        .getMany();
      return {
        total,
        data,
        is_over:
          data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }
}
