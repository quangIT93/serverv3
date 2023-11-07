import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { UpdateCompanyRatingDto } from './dto/update-company-rating.dto';
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
    const { companyId } = createCompanyRatingDto;

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }
    console.log(createCompanyRatingDto);
    const companyRating = this.companyRatingRepository.create(
      createCompanyRatingDto,
    );
    return await this.companyRatingRepository.save(companyRating);
  }

  findAll() {
    return `This action returns all companyRatings`;
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

      const averageRated = Number((totalRated / total).toFixed(1));

      const data = await bookmarked
        .take(limit)
        .skip(page)
        .orderBy('companyBookmarks.updatedAt', 'DESC')
        .getMany();

      return {
        total,
        data,
        averageRated,
        is_over:
          bookmarks.length === total
            ? true
            : bookmarks.length < limit
            ? true
            : false,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} companyRatings`;
  }

  update(id: number, _updateCompanyRatingDto: UpdateCompanyRatingDto) {
    return `This action updates a #${id} companyRating`;
  }

  remove(id: number) {
    return this.companyRatingRepository.delete(id);
  }
}
