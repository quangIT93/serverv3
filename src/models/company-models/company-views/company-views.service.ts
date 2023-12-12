import { Injectable } from '@nestjs/common';
import { CreateCompanyViewDto } from './dto/create-company-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyView } from './entities/company-view.entity';

@Injectable()
export class CompanyViewsService {
  constructor(
    @InjectRepository(CompanyView)
    private companyViewRepository: Repository<CompanyView>,
  ) {}

  async create(_createPostViewDto: CreateCompanyViewDto) {
    if (await this.findOneByPostIdAndAccountId(_createPostViewDto.companyId, _createPostViewDto.accountId)) {
      return;
    }

    const record = this.companyViewRepository.create(_createPostViewDto);

    return this.companyViewRepository.save(record);
  }

  async findAllByAccountId(accountId: string) {
    return await this.companyViewRepository.createQueryBuilder('company_view')
      .select('MONTH(company_view.created_at)', 'month')
      .addSelect('YEAR(company_view.created_at)', 'year')  
      .addSelect('COUNT(*)', 'count')
      .where('company_view.account_id = :accountId', { accountId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC')
      .getRawMany();
  }

  async getTotalViewByAccountId(accountId: string) {
    return await this.companyViewRepository.createQueryBuilder('company_view')
      .select('COUNT(*)', 'count')
      .where('company_view.account_id = :accountId', { accountId })
      .getRawOne();
  }

  async findOneByPostIdAndAccountId(companyId: number, accountId: string) {
    return await this.companyViewRepository.findOne({
      where: {
        companyId,
        accountId,
      }
    });
  }
}
