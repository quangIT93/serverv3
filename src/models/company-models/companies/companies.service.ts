import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { CompanyImagesService } from '../company-images/company-images.service';
import { CompanyImage } from '../company-images/entities/company-image.entity';
import { FilterCompaniesDto } from './dto/filter-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly companyImagesService: CompanyImagesService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async createCompanyImage(
    createCompanyImagesDto: CreateCompanyImageDto[],
  ): Promise<CompanyImage[]> {
    const companyImages = await this.companyImagesService.create(
      createCompanyImagesDto,
    );
    return this.companyImagesService.findByCompanyId(
      companyImages[0].companyId,
    );
  }

  async removeCompanyImages(id: number[], companyId: number): Promise<any> {
    const deletedImages = await Promise.all(
      id.map(async (imageId) => {
        return await this.companyImagesService.remove(imageId, companyId);
      }),
    );

    return deletedImages.filter(
      (image) =>
        image?.affected === undefined ||
        image?.affected === null ||
        image?.affected > 0,
    );
  }

  async findAll(query: FilterCompaniesDto) {
    try {
      const { addresses, categories, companySizeId, limit, page, accountId } =
        query;
      const companies = this.companyRepository
        .createQueryBuilder('companies')
        .leftJoinAndSelect('companies.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('companies.category', 'category')
        .leftJoinAndSelect('companies.companySize', 'companySize')
        .leftJoinAndSelect('companies.posts', 'posts')
        .leftJoinAndSelect(
          'companies.bookmarkedCompany',
          'bookmarkedCompany',
          'bookmarkedCompany.accountId = :accountId',
          { accountId },
        );

      if (addresses) {
        companies.andWhere('district.id IN (:...addresses)', {
          addresses: Array.isArray(addresses) ? addresses : [addresses],
        });
      }

      if (categories) {
        companies.andWhere('category.id IN (:...categories)', {
          categories: Array.isArray(categories) ? categories : [categories],
        });
      }

      if (companySizeId) {
        companies.andWhere('companies.companySize.id = :companySizeId', {
          companySizeId,
        });
      }

      const total = await companies.getCount();

      const data = await companies
        .take(limit ? limit : 20)
        .skip(page ? page : 0)
        .orderBy('companies.updatedAt', 'DESC')
        .getMany();

      return {
        total,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number, accountId?: string) {
    // const data = await this.companyRepository.findOne({
    //   relations: [
    //     'ward',
    //     'ward.district',
    //     'ward.district.province',
    //     'category',
    //     'companyRole',
    //     'companySize',
    //     'companyImages',
    //     'posts',
    //     'posts.ward',
    //     'posts.ward.district',
    //     'posts.ward.district.province',
    //     'posts.postImages',
    //     'posts.jobTypeData',
    //     'posts.salaryTypeData',
    //     'posts.companyResource',
    //     'bookmarkedCompany',
    //   ],
    //   where: { id },
    // });
    const data = this.companyRepository
      .createQueryBuilder('company')
      .where('company.id = :id', { id })
      .leftJoinAndSelect('company.ward', 'ward')
      .leftJoinAndSelect('ward.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('company.category', 'category')
      .leftJoinAndSelect('company.companySize', 'companySize')
      .leftJoinAndSelect('company.companyImages', 'companyImages')
      .leftJoinAndSelect('company.companyRole', 'companyRole')
      .leftJoinAndSelect(
        'company.bookmarkedCompany',
        'bookmarkedCompany',
        'bookmarkedCompany.accountId = :accountId',
        { accountId },
      )
      .getOne();

    return data;
  }

  findOne(id: number, _accountId: string) {
    return this.companyRepository.findOne({
      relations: ['companyImages'],
      where: {
        id,
        accountId: _accountId,
      },
    });
  }

  findByAccountId(_accountId: string) {
    return this.companyRepository.findOne({
      relations: [
        'ward',
        'ward.district',
        'ward.district.province',
        'companyRole',
        'companySize',
      ],
      where: {
        accountId: _accountId,
      },
    });
  }

  async update(id: number, _updateCompanyDto: UpdateCompanyDto) {
    await this.companyRepository.update({ id }, _updateCompanyDto);
    return await this.companyRepository.findOne({ where: { id } });
  }

  remove(id: number, _accountId: string) {
    return this.companyRepository.delete({ id, accountId: _accountId });
  }

  async getCompanyImages(id: number, _accountId: string) {
    try {
      return this.companyImagesService.findByCompanyId(id);
    } catch (error) {
      throw error;
    }
  }
}
