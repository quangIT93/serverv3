import { Exclude, Expose, Transform } from 'class-transformer';
import { Company } from '../entities/company.entity';
import { Language } from 'src/common/enum';
import {
  categoryTranslator,
  locationTranslator,
} from 'src/common/helper/translators';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { CompanySizeSerialization } from '../../company-sizes/serialization/company-size.serialization';
import { CompanySize } from '../../company-sizes/entities/company-size.entity';
import { CompanyImagesSerializer } from '../../company-images/serializers/company-images.serializer';
import { BUCKET_IMAGE_COMPANIES_LOGO } from 'src/common/constants';
import { CompanyRoleSerialization } from '../../company-roles/serialization/company-role.serializarion';
import { CompanyRole } from '../../company-roles/entities/company-role.entity';
import { CompanyBookmarked } from '../../company-bookmarked/entities/company-bookmarked.entity';
import { Post } from 'src/models/post-models/posts/entities';

export class CompanyDetailSerialization extends Company {
  @Exclude()
  lang!: Language;

  constructor(company: Company, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, company);
  }

  @Exclude({ toPlainOnly: true })
  override logo!: string;

  @Exclude({ toPlainOnly: true })
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override companyRoleId!: number;

  @Exclude({ toPlainOnly: true })
  override companySizeId!: number;

  @Exclude({ toPlainOnly: true })
  override categoryId!: number;

  @Exclude({ toPlainOnly: true })
  override ward!: any;

  @Exclude({ toPlainOnly: true })
  override category!: ParentCategory;

  @Exclude({ toPlainOnly: true })
  override companySize!: CompanySize;

  @Exclude({ toPlainOnly: true })
  override companyImages!: CompanyImagesSerializer[];

  @Exclude({ toPlainOnly: true })
  override companyRole!: CompanyRole;

  @Exclude({ toPlainOnly: true })
  override bookmarkedCompany!: CompanyBookmarked[];

  @Exclude({ toPlainOnly: true })
  override posts!: Post[];

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Transform(({ value }) => new Date(value).getTime())
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
  get companyCategory() {
    if (!this.companySize) return null;
    return categoryTranslator(this.category, this.lang);
  }

  @Expose()
  get companyRoleInfomation() {
    if (!this.companyRole) return null;
    return Object.assign(
      new CompanyRoleSerialization(this.companyRole, this.lang),
    );
  }

  @Expose()
  get companySizeInfomation() {
    if (!this.companySize) return null;
    return Object.assign(
      new CompanySizeSerialization(this.companySize, this.lang),
    );
  }

  @Expose()
  get images() {
    if (!this.companyImages) return null;
    return this.companyImages.map((companyImage) =>
      Object.assign(new CompanyImagesSerializer(companyImage)),
    );
  }

  @Expose()
  get isBookmarked() {
    return this.bookmarkedCompany.length > 0 ? true : false;
  }

  @Expose()
  get amountPost() {
    if (!this.posts) return null;
    return this.posts.length;
  }
}
