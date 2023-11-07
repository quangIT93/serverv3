import { Injectable } from '@nestjs/common';
import { CreateCompanyBookmarkedDto } from './dto/create-company-bookmarked.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBookmarked } from './entities/company-bookmarked.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyBookmarkedService {
  constructor(
    @InjectRepository(CompanyBookmarked)
    private readonly companyBookmarkedRepository: Repository<CompanyBookmarked>,
  ) {}
  async create(createCompanyBookmarkedDto: CreateCompanyBookmarkedDto) {
    try {
      const { accountId, companyId } = createCompanyBookmarkedDto;

      const existing = await this.companyBookmarkedRepository.findOne({
        where: {
          accountId,
          companyId,
        },
      });

      if (existing) {
        await this.companyBookmarkedRepository.delete({
          accountId,
          companyId,
        });
        return;
      }

      const newCompanyBookmark = this.companyBookmarkedRepository.create(
        createCompanyBookmarkedDto,
      );

      return await this.companyBookmarkedRepository.save(newCompanyBookmark);
    } catch (error) {
      throw error;
    }
  }

  async findAllByAccount(
    accountId: string,
    limit: number,
    page: number,
    sort: 'DESC' | 'ASC',
  ) {
    try {
      const data = await this.companyBookmarkedRepository.find({
        where: { accountId },
        relations: [
          'company',
          'company.bookmarkedCompany',
          'company.posts',
          'company.ward',
          'company.ward.district',
          'company.ward.district.province',
          'company.category',
          'company.companySize',
        ],
        take: limit,
        skip: page * limit,
        order: { createdAt: sort },
      });

      const total = await this.companyBookmarkedRepository.count({
        where: { accountId },
      });

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
