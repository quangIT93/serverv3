import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyViewDto } from './dto/create-company-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyView } from './entities/company-view.entity';
import { Company } from '../companies/entities/company.entity';
import { QueryCompanyViewDto } from './dto/query-company-view.dto';
import { User } from 'src/models/users/entities';

@Injectable()
export class CompanyViewsService {
  constructor(
    @InjectRepository(CompanyView)
    private companyViewRepository: Repository<CompanyView>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(_createPostViewDto: CreateCompanyViewDto) {
    if (
      await this.findOneByPostIdAndAccountId(
        _createPostViewDto.companyId,
        _createPostViewDto.accountId,
      )
    ) {
      return;
    }

    const account = await this.userRepository.findOne({
      where: { id: _createPostViewDto.accountId },
    });

    // check user is candidate if not return
    if (account?.type === 1) {
      return;
    }

    const record = this.companyViewRepository.create(_createPostViewDto);

    return this.companyViewRepository.save(record);
  }

  async findAllByAccountId(accountId: string) {
    return await this.companyViewRepository
      .createQueryBuilder('company_view')
      .select('MONTH(company_view.created_at)', 'month')
      .addSelect('YEAR(company_view.created_at)', 'year')
      .addSelect('COUNT(*)', 'count')
      .where('company_view.account_id = :accountId', { accountId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC')
      .getRawMany();
  }

  async getTotalViewByAccountId(accountId: string) {
    return await this.companyViewRepository
      .createQueryBuilder('company_view')
      .select('COUNT(*)', 'count')
      .where('company_view.account_id = :accountId', { accountId })
      .getRawOne();
  }

  async findOneByPostIdAndAccountId(companyId: number, accountId: string) {
    return await this.companyViewRepository.findOne({
      where: {
        companyId,
        accountId,
      },
    });
  }

  async findAllByCompany(accountId: string, query: QueryCompanyViewDto) {
    try {
      const { limit = 20, page = 0 } = query;
      const company = await this.companyRepository.findOne({
        where: { accountId },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      const views = this.companyViewRepository
        .createQueryBuilder('companyViews')
        .where('companyViews.companyId = :companyId', { companyId: company.id })
        .leftJoinAndSelect('companyViews.user', 'user')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('profile.childCategories', 'childCategory')
        .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory')
        .leftJoinAndSelect('profile.profilesLocations', 'district')
        .leftJoinAndSelect('district.province', 'province');

      const total = await views.getCount();

      const data = await views
        .take(limit)
        .skip(page * limit)
        .orderBy('companyViews.createdAt', 'DESC')
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
