import { CompanyViewsService } from './../company-views/company-views.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { CompanyImagesService } from '../company-images/company-images.service';
import { CompanyImage } from '../company-images/entities/company-image.entity';
import { FilterCompaniesDto } from './dto/filter-company.dto';
import { StatusCompany } from 'src/common/enum';
import { addressTranslator } from 'src/common/helper/translators/address.translator';
import { SiteService } from 'src/models/site/site.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly companyImagesService: CompanyImagesService,
    private readonly siteService: SiteService,
    private readonly companyViewsService: CompanyViewsService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const isExist = await this.companyRepository.findOne({
      where: { accountId: createCompanyDto.accountId },
    });

    if (isExist) {
      throw new BadRequestException('Account created company ');
    }

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
      const {
        addresses,
        categories,
        companySizeId,
        limit = 20,
        page = 0,
        accountId,
        status = 1,
        accountIds,
      } = query;
      const companies = this.companyRepository
        .createQueryBuilder('companies')
        .where('companies.status = :status', { status })
        .leftJoinAndSelect('companies.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('companies.category', 'category')
        .leftJoinAndSelect('companies.companySize', 'companySize')
        .leftJoinAndSelect('companies.posts', 'posts', 'posts.status = 1')
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

      // if (addresses) {
      //   companies.andWhere('province.id = :addresses', {
      //     addresses,
      //   });
      // }

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

      if (accountIds) {
        companies.andWhere('companies.accountId IN (:...accountIds)', {
          accountIds: Array.isArray(accountIds) ? accountIds : [accountIds],
        });
      }

      const total = await companies.getCount();

      const data = await companies
        .take(limit)
        .skip(page * limit)
        .orderBy('companies.createdAt', 'DESC')
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

  async findById(id: number, accountId?: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    if (accountId) {
      await this.companyViewsService.create({
        accountId,
        companyId: id,
      });
    }

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
      .leftJoinAndSelect('company.posts', 'posts', 'posts.status = 1')
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

  async updateStatusCompany(id: number, status: StatusCompany) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      await this.companyRepository.update(id, { status });
    } catch (error) {
      throw error;
    }
  }

  async findAllByAdmin() {
    try {
      const companies = this.companyRepository
        .createQueryBuilder('companies')
        .leftJoinAndSelect('companies.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('companies.category', 'category')
        .leftJoinAndSelect('companies.companySize', 'companySize')
        .leftJoinAndSelect('companies.posts', 'posts', 'posts.status = 1');
      const total = await companies.getCount();
      const data = await companies
        .orderBy('companies.createdAt', 'DESC')
        .getMany();

      return {
        total,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateLocationCompany(id: number) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      if (!company.ward) {
        throw new BadRequestException('Company ward not found');
      }

      const address = addressTranslator({
        location: company.ward,
        address: company.address,
      });

      if (!address) return;

      const location = await this.siteService.googlemapGeocoding(address);

      if (location.status === 'OK') {
        const { lat, lng } = location.results[0].geometry.location;

        await this.companyRepository.update(id, {
          latitude: lat,
          longitude: lng,
        });
      }

      return;
    } catch (error) {
      throw error;
    }
  }
}
