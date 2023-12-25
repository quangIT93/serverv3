import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDescriptionTemplateDto } from './dto/create-company-description-template.dto';
import { UpdateCompanyDescriptionTemplateDto } from './dto/update-company-description-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDescriptionTemplate } from './entities/company-description-template.entity';
import { Repository } from 'typeorm';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { QueryCompanyDescriptionDto } from './dto/query-company-description.dto';

@Injectable()
export class CompanyDescriptionTemplatesService {
  constructor(
    @InjectRepository(CompanyDescriptionTemplate)
    private readonly companyTemplateRepository: Repository<CompanyDescriptionTemplate>,
    @InjectRepository(ParentCategory)
    private readonly parentCategoryRepository: Repository<ParentCategory>,
  ) {}
  async create(
    _createCompanyDescriptionTemplateDto: CreateCompanyDescriptionTemplateDto,
  ) {
    try {
      const parentCategory = await this.parentCategoryRepository.findOne({
        where: { id: _createCompanyDescriptionTemplateDto.parentCategoryId },
      });

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }

      const template = this.companyTemplateRepository.create(
        _createCompanyDescriptionTemplateDto,
      );

      return await this.companyTemplateRepository.save(template);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryCompanyDescriptionDto) {
    try {
      const { limit, page, parentCategoryId, title } = query;

      const template =
        this.companyTemplateRepository.createQueryBuilder('template');

      if (parentCategoryId) {
        template.andWhere('template.parentCategoryId = :parentCategoryId', {
          parentCategoryId,
        });
      }

      if (title) {
        template.andWhere('template.title like :title', {
          title: `%${title}%`,
        });
      }

      const total = await template.getCount();

      const data = await template
        .take(limit ? limit : 20)
        .skip(page ? page * limit : 0)
        .orderBy('template.createdAt', 'DESC')
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

  async findAllByAdmin() {
    return await this.companyTemplateRepository.find({
      relations: { parentCategory: true },
    });
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

      const parentCategory = await this.parentCategoryRepository.findOne({
        where: { id: _updateCompanyDescriptionTemplateDto.parentCategoryId },
      });

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
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
