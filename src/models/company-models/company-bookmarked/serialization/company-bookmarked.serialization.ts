import { Exclude, Expose } from 'class-transformer';
import { CompanyBookmarked } from '../entities/company-bookmarked.entity';
import { Language } from 'src/common/enum';
import { CompaniesSerialization } from '../../companies/serialization/companies.serialization';
import { Company } from '../../companies/entities/company.entity';

export class CompanyBookmarkedSerialization extends CompanyBookmarked {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(companyBookmarked: CompanyBookmarked, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, companyBookmarked);
  }

  @Exclude({ toPlainOnly: true })
  override companyId!: number;

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override company!: Company;

  @Expose()
  get CompanyData() {
    return Object.assign(new CompaniesSerialization(this.company, this.lang));
  }
}
