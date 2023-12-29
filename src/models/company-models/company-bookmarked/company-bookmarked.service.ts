import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyBookmarkedDto } from './dto/create-company-bookmarked.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBookmarked } from './entities/company-bookmarked.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CompanyBookmarkedService {
  constructor(
    @InjectRepository(CompanyBookmarked)
    private readonly companyBookmarkedRepository: Repository<CompanyBookmarked>,

    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
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
    status = 1,
  ) {
    try {
      const bookmarked = this.companyBookmarkedRepository
        .createQueryBuilder('companyBookmarked')
        .where('companyBookmarked.accountId = :accountId', { accountId })
        .leftJoinAndSelect('companyBookmarked.company', 'company')
        .leftJoinAndSelect('company.bookmarkedCompany', 'bookmarkedCompany')
        .leftJoinAndSelect('company.posts', 'post', 'post.status = :status', {
          status,
        })
        .leftJoinAndSelect('company.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('company.category', 'category')
        .leftJoinAndSelect('company.companySize', 'companySize');

      const total = await bookmarked.getCount();

      const data = await bookmarked
        .take(limit)
        .skip(page * limit)
        .orderBy('companyBookmarked.createdAt', sort)
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

  async findAllByCompany(
    accountId: string,
    limit: number,
    page: number,
    sort: 'DESC' | 'ASC',
  ) {
    try {
      const company = await this.CompanyRepository.findOne({
        where: { accountId },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      const bookmarked = this.companyBookmarkedRepository
        .createQueryBuilder('companyBookmarked')
        .where('companyBookmarked.companyId = :companyId', {
          companyId: company.id,
        })
        .leftJoinAndSelect('companyBookmarked.user', 'user')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('profile.childCategories', 'childCategory')
        .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory')
        .leftJoinAndSelect('profile.profilesLocations', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .andWhere('user.type = 0');

      const total = await bookmarked.getCount();

      const data = await bookmarked
        .take(limit)
        .skip(page * limit)
        .orderBy('companyBookmarked.createdAt', sort)
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
