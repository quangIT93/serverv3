import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDescriptionTemplateDto } from './dto/create-category-description-template.dto';
import { UpdateCategoryDescriptionTemplateDto } from './dto/update-category-description-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDescriptionTemplate } from './entities/category-description-template.entity';
import { Repository } from 'typeorm';
import { PagingDto } from 'src/common/dtos/paging.dto';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';

@Injectable()
export class CategoryDescriptionTemplatesService {
  constructor(
    @InjectRepository(CategoryDescriptionTemplate)
    private readonly categoryTemplateRepository: Repository<CategoryDescriptionTemplate>,

    @InjectRepository(ChildCategory)
    private readonly childCategoryRepository: Repository<ChildCategory>,
  ) {}

  async create(
    createCategoryDescriptionTemplateDto: CreateCategoryDescriptionTemplateDto,
  ) {
    try {
      const category = await this.childCategoryRepository.findOne({
        where: { id: createCategoryDescriptionTemplateDto.childCategoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const categoryTemplate = this.categoryTemplateRepository.create(
        createCategoryDescriptionTemplateDto,
      );

      return await this.categoryTemplateRepository.save(categoryTemplate);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.categoryTemplateRepository.find({
        relations: { childCategory: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByCategoryId(childCategoryId: number, query: PagingDto) {
    try {
      const { limit, page } = query;
      const category = await this.childCategoryRepository.findOne({
        where: { id: childCategoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const data = await this.categoryTemplateRepository.find({
        where: { childCategoryId },
        take: limit ? limit : 20,
        skip: page ? page * limit : 0,
      });

      const total = await this.categoryTemplateRepository.count({
        where: { childCategoryId },
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

  async findOne(id: number) {
    try {
      const data = await this.categoryTemplateRepository.findOne({
        where: { id },
        relations: { childCategory: true },
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
    updateCategoryDescriptionTemplateDto: UpdateCategoryDescriptionTemplateDto,
  ) {
    try {
      const template = await this.categoryTemplateRepository.findOne({
        where: { id },
      });

      if (!template) {
        throw new NotFoundException('Template not found');
      }

      const category = await this.childCategoryRepository.findOne({
        where: { id: updateCategoryDescriptionTemplateDto.childCategoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryTemplateRepository.update(
        id,
        updateCategoryDescriptionTemplateDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.categoryTemplateRepository.findOne({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Template not found');
      }

      await this.categoryTemplateRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
