import { Exclude } from 'class-transformer';
import { Language } from 'src/common/enum';
import { Company } from 'src/models/company-models/companies/entities/company.entity';

export class ProfileCompanyInformationSerialization extends Company {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(company: Company, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, company);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override logo!: string;

  @Exclude({ toPlainOnly: true })
  override taxCode!: string;

  @Exclude({ toPlainOnly: true })
  override address!: string;

  @Exclude({ toPlainOnly: true })
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override website!: string;

  @Exclude({ toPlainOnly: true })
  override description!: string;

  @Exclude({ toPlainOnly: true })
  override companyRoleId!: number;

  @Exclude({ toPlainOnly: true })
  override companySizeId!: number;

  @Exclude({ toPlainOnly: true })
  override categoryId!: number;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;
}
