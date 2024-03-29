import { Language } from 'src/common/enum';
import { Company } from '../entities/company.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Post } from 'src/models/post-models/posts/entities';
import { locationTranslator } from 'src/common/helper/translators';
import { BUCKET_IMAGE_COMPANIES_LOGO } from 'src/common/constants';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { CompanySize } from '../../company-sizes/entities/company-size.entity';
import { CompanyBookmarked } from '../../company-bookmarked/entities/company-bookmarked.entity';
import { ParentCategoriesSerialization } from 'src/models/categories/parents/serialization/ParentCategoies.serialization';
import { CompanySizeSerialization } from '../../company-sizes/serialization/company-size.serialization';

export class CompaniesSerialization extends Company {
  @Exclude()
  lang: Language;

  constructor(company: Company, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, company);
  }

  @Exclude({ toPlainOnly: true })
  override logo!: string;

  @Exclude({ toPlainOnly: true })
  override taxCode!: string;

  @Exclude({ toPlainOnly: true })
  override phone!: string;

  // @Exclude({ toPlainOnly: true })
  // override email!: string;

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
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override ward: any;

  @Exclude({ toPlainOnly: true })
  override posts!: Post[];

  @Exclude({ toPlainOnly: true })
  override category!: ParentCategory;

  @Exclude({ toPlainOnly: true })
  override companySize!: CompanySize;

  @Exclude({ toPlainOnly: true })
  override bookmarkedCompany!: CompanyBookmarked[];

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;

  @Transform(({ value }) => parseFloat(value))
  override latitude!: number;

  @Transform(({ value }) => parseFloat(value))
  override longitude!: number;

  @Expose()
  get logoPath() {
    if (!this.logo) return null;
    return `${BUCKET_IMAGE_COMPANIES_LOGO}/${this.id}/${this.logo}`;
  }

  @Expose()
  get companyLocation() {
    if (!this.ward) return null;
    return locationTranslator(this.ward, this.lang);
  }

  @Expose()
  get categoryData() {
    if (!this.category) return null;
    return new ParentCategoriesSerialization(this.category, this.lang);
  }

  @Expose()
  get companySizeData() {
    if (!this.companySize) return null;
    return new CompanySizeSerialization(this.companySize, this.lang);
  }

  @Expose()
  get amountPost() {
    if (!this.posts) return null;
    return this.posts.length;
  }

  @Expose()
  get isBookmarked() {
    if (!this.bookmarkedCompany) return false;
    return this.bookmarkedCompany.length > 0 ? true : false;
  }
}
