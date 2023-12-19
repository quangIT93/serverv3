import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDescriptionTemplateDto } from './dto/create-company-description-template.dto';
import { UpdateCompanyDescriptionTemplateDto } from './dto/update-company-description-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDescriptionTemplate } from './entities/company-description-template.entity';
import { Repository } from 'typeorm';
import { PagingDto } from 'src/common/dtos/paging.dto';

@Injectable()
export class CompanyDescriptionTemplatesService {
  constructor(
    @InjectRepository(CompanyDescriptionTemplate)
    private readonly companyTemplateRepository: Repository<CompanyDescriptionTemplate>,
  ) {}
  async create(
    _createCompanyDescriptionTemplateDto: CreateCompanyDescriptionTemplateDto,
  ) {
    try {
      const template = this.companyTemplateRepository.create(
        _createCompanyDescriptionTemplateDto,
      );

      return await this.companyTemplateRepository.save(template);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PagingDto) {
    try {
      const { limit, page } = query;
      const data = await this.companyTemplateRepository.find({
        take: limit ? limit : 20,
        skip: page ? page * limit : 0,
      });

      const total = await this.companyTemplateRepository.count();

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

  async findAllByAdmin() {
    return await this.companyTemplateRepository.find();
  }

  async findOne(id: number) {
    try {
      const data = await this.companyTemplateRepository.findOne({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Template not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    _updateCompanyDescriptionTemplateDto: UpdateCompanyDescriptionTemplateDto,
  ) {
    try {
      const data = await this.companyTemplateRepository.findOne({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Template not found');
      }

      await this.companyTemplateRepository.update(
        id,
        _updateCompanyDescriptionTemplateDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.companyTemplateRepository.findOne({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Template not found');
      }

      await this.companyTemplateRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
