import { PickType } from '@nestjs/swagger';
import { FilterCompaniesDto } from 'src/models/company-models/companies/dto/filter-company.dto';

export class ViewedCompanyDto extends PickType(FilterCompaniesDto, [
  'limit',
  'page',
]) {
  accountIds!: string[];
}
