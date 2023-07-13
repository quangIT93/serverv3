import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  findByAccountId(_accountId: string) {
    return this.companyRepository.findOne({
      relations: ['ward', 'ward.district', 'ward.district.province', 'companyRole', 'companySize'],
      where: {
        accountId: _accountId,
      },
    })
  }

  update(id: number, _updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update({ id }, _updateCompanyDto).then(() => {
      return this.companyRepository.findOne({ where: { id } });
    });
  }

  remove(id: number, _accountId: string) {
    return this.companyRepository.delete({ id, accountId: _accountId });
  }
}
