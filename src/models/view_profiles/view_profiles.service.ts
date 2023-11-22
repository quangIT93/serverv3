import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { UserService } from '../users/users.service';
import { NOT_ENOUGH_POINTS, NO_PERMISSION } from 'src/common/constants';
import { CompaniesService } from '../company-models/companies/companies.service';
import { ViewedCompanyDto } from './dto/viewed-company.dto';
import { Company } from '../company-models/companies/entities/company.entity';

@Injectable()
export class ViewProfilesService {
  constructor(
    @InjectRepository(ViewProfile)
    private viewProfileRepository: Repository<ViewProfile>,
    private readonly userService: UserService,
    private readonly companiesService: CompaniesService,
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
      const viewed = await this.viewProfileRepository.find({
        where: { profileId: accountId },
      });

      const accountIds = viewed.map((view) => view.recruitId);

      query.accountId = accountId;
      query.accountIds = accountIds;

      return await this.companiesService.findAll(query);
    } catch (error) {
      throw error;
    }
  }
}
