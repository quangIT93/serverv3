import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { UpdateCompanyRatingByUserDto } from './dto/update-company-rating-by-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRating } from './entities/company-rating.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CompanyRatingsService {
  constructor(
    @InjectRepository(CompanyRating)
    private companyRatingRepository: Repository<CompanyRating>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyRatingDto: CreateCompanyRatingDto) {
    try {
      const { companyId, accountId } = createCompanyRatingDto;

      const rated = await this.companyRatingRepository.findOne({
        where: { accountId, companyId },
      });

      if (rated) {
        throw new BadRequestException('Account has rated this company');
      }

      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      const companyRating = this.companyRatingRepository.create(
        createCompanyRatingDto,
      );
      return await this.companyRatingRepository.save(companyRating);
    } catch (error) {
      throw error;
    }
  }

  async findAllByCompany(id: number, limit: number, page: number) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      const bookmarked = this.companyRatingRepository
        .createQueryBuilder('companyBookmarks')
        .where('companyBookmarks.companyId = :id', { id })
        .leftJoinAndSelect('companyBookmarks.account', 'account')
        .leftJoinAndSelect('account.profile', 'profile');

      const total = await bookmarked.getCount();
      const bookmarks = await bookmarked.getMany();

      const totalRated = bookmarks.reduce((total, item) => {
        return total + Number(item.star);
      }, 0);

      const averageRated = Number(totalRated / total).toFixed(1);

      const data = await bookmarked
        .take(limit)
        .skip(page * limit)
        .orderBy('companyBookmarks.updatedAt', 'DESC')
        .getMany();

      return {
        total,
        data,
        averageRated,
        is_over:
          data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneByUser(accountId: string, companyId: number) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      const rated = await this.companyRatingRepository.findOne({
        where: { accountId, companyId },
      });

      // if (!rated) {
      //   throw new NotFoundException('Account has not rated the company yet');
      // }

      return rated;
    } catch (error) {
      throw error;
    }
  }

  async updateByUser(updateCompanyRatingDto: UpdateCompanyRatingByUserDto) {
    try {
      const { accountId, companyId } = updateCompanyRatingDto;
      const rated = await this.companyRatingRepository.findOne({
        where: { accountId, companyId },
      });

      if (!rated) {
        throw new NotFoundException('Evaluate not found');
      }

      await this.companyRatingRepository.update(
        rated.id,
        updateCompanyRatingDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async removeByUser(accountId: string, companyId: number) {
    try {
      const rated = await this.companyRatingRepository.findOne({
        where: { accountId, companyId },
      });

      if (!rated) {
        throw new NotFoundException('Evaluate not found');
      }

      return this.companyRatingRepository.delete(rated.id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const rated = await this.companyRatingRepository.findOne({
        where: { id },
      });

      if (!rated) {
        throw new NotFoundException('Evaluate not found');
      }
      return this.companyRatingRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
