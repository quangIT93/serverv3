import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { CompanyImagesService } from '../company-images/company-images.service';
import { CompanyImage } from '../company-images/entities/company-image.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly companyImagesService: CompanyImagesService,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async createCompanyImage(createCompanyImagesDto: CreateCompanyImageDto[]): Promise<CompanyImage[]> {
    const companyImages = await this.companyImagesService.create(createCompanyImagesDto);
    return this.companyImagesService.findByCompanyId(companyImages[0].companyId);
  }

  async removeCompanyImages(id: number[], companyId: number): Promise<any> {
   const deletedImages = await Promise.all(id.map(async (imageId) => {
      return await this.companyImagesService.remove(imageId, companyId);
    }));

    return deletedImages.filter((image) => image?.affected === undefined || image?.affected === null || image?.affected > 0);
  }

  findAll() {
    return `This action returns all companies`;
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
      relations: ['ward', 'ward.district', 'ward.district.province', 'companyRole', 'companySize'],
      where: {
        accountId: _accountId,
      },
    })
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
