import { Exclude, Transform } from 'class-transformer';
import { CompanyRating } from '../entities/company-rating.entity';
import { Language } from 'src/common/enum';

export class CompanyRatingSerialization extends CompanyRating {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(companyRating: CompanyRating, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, companyRating);
  }

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Transform(({ value }) => new Date(value).getTime())
  override updatedAt!: Date;
}
