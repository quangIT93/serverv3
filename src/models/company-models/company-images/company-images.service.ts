import { Injectable } from '@nestjs/common';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { CompanyImage } from './entities/company-image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyImagesService {

  constructor(
    @InjectRepository(CompanyImage)
    private readonly companyImageRepository: Repository<CompanyImage>,
  ) { }

  create(_createCompanyImageDto: CreateCompanyImageDto[]) {
    const companyImage = this.companyImageRepository.create(_createCompanyImageDto);
    return this.companyImageRepository.save(companyImage);
  }

  findByCompanyId(companyId: number) {
    return this.companyImageRepository.find({ where: { companyId } });
  }

  remove(id: number, companyId: number) {
    return this.companyImageRepository.delete({ id, companyId });

  }
}
