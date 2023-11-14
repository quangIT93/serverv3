import { Exclude, Expose } from 'class-transformer';
import { CompanyResource } from '../entities/company-resources.entity';
import { Language } from 'src/common/enum';
import { BUCKET_IMAGE_COMPANY_ICON } from 'src/common/constants';

export class CompanyResourceSerialization extends CompanyResource {
  @Exclude()
  lang!: Language;

  constructor(companyResource: CompanyResource, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, companyResource);
  }

  @Exclude({ toPlainOnly: true })
  override logo!: string;

  @Expose()
  get logoPath() {
    if (!this.logo) return null;
    return `${BUCKET_IMAGE_COMPANY_ICON}/${this.logo}`;
  }
}
