import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { UpdateCompanyRatingDto } from './dto/update-company-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRating } from './entities/company-rating.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { User } from 'src/models/users/entities';

@Injectable()
export class CompanyRatingsService {
  constructor(
    @InjectRepository(CompanyRating)
    private companyRatingRepository: Repository<CompanyRating>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(createCompanyRatingDto: CreateCompanyRatingDto) {
    const { companyId, accountId } = createCompanyRatingDto;

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const user = await this.UserRepository.findOne({
      where: { id: accountId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const companyRating = this.companyRatingRepository.create(
      createCompanyRatingDto,
    );
    return await this.companyRatingRepository.save(companyRating);
  }

  findAll() {
    return `This action returns all companyRatings`;
  }

  async findAllByCompany(id: number) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      const data = await this.companyRatingRepository.find({
        relations: ['account', 'account.profile'],
        where: { companyId: id },
      });

      const totalRated = data.reduce((total, item) => {
        return total + Number(item.star);
      }, 0);

      const averageRated = Number((totalRated / data.length).toFixed(1));

      return {
        total: data.length,
        data,
        averageRated,
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
