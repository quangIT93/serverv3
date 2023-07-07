import { Injectable } from '@nestjs/common';
import { CreateCompanySizeDto } from './dto/create-company-size.dto';
import { UpdateCompanySizeDto } from './dto/update-company-size.dto';

@Injectable()
export class CompanySizesService {
  create(_createCompanySizeDto: CreateCompanySizeDto) {
    return 'This action adds a new companySize';
  }

  findAll() {
    return `This action returns all companySizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companySize`;
  }

  update(id: number, _updateCompanySizeDto: UpdateCompanySizeDto) {
    return `This action updates a #${id} companySize`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySize`;
  }
}
