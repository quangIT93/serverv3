import { Exclude, Expose } from 'class-transformer';
import { Post } from '../entities';
import { Language, MoneyType } from 'src/common/enum';
import { Ward } from 'src/models/locations/wards/entities';
import { locationTranslator } from 'src/common/helper/translators';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { SalaryTypeSerialization } from 'src/models/salary-types/serialization/salary-type.serialization';
import { SalaryType } from 'src/models/salary-types/entities/salary-type.entity';
import { CompanyResourceSerialization } from 'src/models/company-resources/serialization/company-resource.serialization';
import { CompanyResource } from 'src/models/company-resources/entities/company-resources.entity';
import { JobTypesSerialization } from 'src/models/job-types/serialization/job_types.serialization';
import { JobType } from 'src/models/job-types/entities/job-type.entity';
import { BUCKET_IMAGE_POST } from 'src/common/constants';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { PostImages } from '../../posts-images/entities/post-images.entity';
import { Company } from 'src/models/company-models/companies/entities/company.entity';

export class PostsSerialization extends Post {
  @Exclude()
  lang!: Language;

  constructor(post: Post, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, post);
  }

  @Exclude({ toPlainOnly: true })
  override description!: string;

  @Exclude({ toPlainOnly: true })
  override phoneContact!: string;

  @Exclude({ toPlainOnly: true })
  override email!: string;

  @Exclude({ toPlainOnly: true })
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override ward!: Ward;

  @Exclude({ toPlainOnly: true })
  override status!: number;

  @Exclude({ toPlainOnly: true })
  override companyResourceId!: number;

  @Exclude({ toPlainOnly: true })
  override salaryType!: number;

  @Exclude({ toPlainOnly: true })
  override url!: string;

  @Exclude({ toPlainOnly: true })
  override moneyType!: string;

  @Exclude({ toPlainOnly: true })
  override bookmarks!: Bookmark[];

  @Exclude({ toPlainOnly: true })
  override isDatePeriod!: number;

  @Exclude({ toPlainOnly: true })
  override startDate!: string;

  @Exclude({ toPlainOnly: true })
  override endDate!: string;

  @Exclude({ toPlainOnly: true })
  override startTime!: string;

  @Exclude({ toPlainOnly: true })
  override endTime!: string;

  @Exclude({ toPlainOnly: true })
  override isWorkingWeekend!: number;

  @Exclude({ toPlainOnly: true })
  override isRemotely!: string;

  @Exclude({ toPlainOnly: true })
  override isInHouseData!: string;

  @Exclude({ toPlainOnly: true })
  override expiredDate!: Date;

  @Exclude({ toPlainOnly: true })
  override jobType!: number;

  @Exclude({ toPlainOnly: true })
  override salaryTypeData!: SalaryType;

  @Exclude({ toPlainOnly: true })
  override companyResource!: CompanyResource;

  @Exclude({ toPlainOnly: true })
  override jobTypeData!: JobType;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override createdAtDate!: Date;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override postImages!: PostImages[];

  @Exclude({ toPlainOnly: true })
  override categories!: ChildCategory[];

  @Exclude({ toPlainOnly: true })
  override companyInformation!: Company;

  @Exclude({ toPlainOnly: true })
  override latitude!: number;

  @Exclude({ toPlainOnly: true })
  override longitude!: number;

  @Expose()
  get moneyTypeData() {
    if (!this.moneyType) return null;
    return this.moneyType === MoneyType.VND ? 'VND' : 'USD';
  }

  @Expose()
  get createdAtText() {
    return timeToTextTransform(this.createdAt, this.lang);
  }

  @Expose()
  get salaryTypeValue() {
    if (!this.salaryType) return null;
    return new SalaryTypeSerialization(this.salaryTypeData, this.lang);
  }

  @Expose()
  get JobTypeValue() {
    if (!this.jobTypeData) return null;
    return new JobTypesSerialization(this.jobTypeData, this.lang);
  }

  @Expose()
  get location() {
    if (!this.ward) return null;
    return locationTranslator(this.ward, this.lang);
  }

  @Expose()
  get companyResourceData() {
    if (!this.companyResource) return null;
    return new CompanyResourceSerialization(this.companyResource, this.lang);
  }

  @Expose()
  get bookmarked() {
    if (!this.bookmarks) return null;
    return this.bookmarks?.length > 0 ? true : false;
  }

  @Expose()
  get image() {
    return this.postImages && this.postImages.length > 0
      ? `${BUCKET_IMAGE_POST}/${this.id}/${this.postImages[0].image}`
      : this.categories
      ? this.categories[0]?.parentCategory.image
      : null;
  }

  @Expose()
  get companyId() {
    if (!this.companyInformation) return null;
    return this.companyInformation.id;
  }
}
