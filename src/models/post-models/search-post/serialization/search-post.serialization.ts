import { Exclude, Expose, Transform } from 'class-transformer';
import { Post } from '../../posts/entities';
import { Ward } from 'src/models/locations/wards/entities';
import { BUCKET_IMAGE_POST } from 'src/common/constants';
import { PostImages } from '../../posts-images/entities/post-images.entity';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { Language, MoneyType } from 'src/common/enum';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { JobType } from 'src/models/job-types/entities/job-type.entity';
import { SalaryTypeSerialization } from 'src/models/salary-types/serialization/salary-type.serialization';
import { JobTypesSerialization } from 'src/models/job-types/serialization/job_types.serialization';
import { locationTranslator } from 'src/common/helper/translators';
import { CompanyResourceSerialization } from 'src/models/company-resources/serialization/company-resource.serialization';

export class SearchPostSerialization extends Post {
  lang: Language = Language.VI;

  constructor(post: Post, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, post);
  }

  @Exclude()
  override latitude!: number;

  @Exclude()
  override longitude!: number;

  @Exclude({ toPlainOnly: true })
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override ward!: Ward;

  @Exclude({ toPlainOnly: true })
  override categories!: ChildCategory[];

  @Exclude({ toPlainOnly: true })
  override postImages: PostImages[] | undefined;

  @Exclude({ toPlainOnly: true })
  override companyInformation: any;

  @Exclude({ toPlainOnly: true })
  override jobTypeData!: JobType;

  @Exclude({ toPlainOnly: true })
  override companyResource!: any;

  @Exclude({ toPlainOnly: true })
  override salaryType!: number;

  @Exclude({ toPlainOnly: true })
  override salaryTypeData!: any;

  @Exclude({ toPlainOnly: true })
  override profile!: any;

  @Exclude({ toPlainOnly: true })
  override createdAtDate!: Date;

  @Transform(({ value }) => (value ? +value : null))
  override startDate!: string | null;

  @Transform(({ value }) => (value ? +value : null))
  override endDate!: string | null;

  @Transform(({ value }) => (value ? +value : null))
  override startTime!: string;

  @Transform(({ value }) => (value ? +value : null))
  override endTime!: string;

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Transform(({ value }) => new Date(value).getTime())
  override updatedAt!: Date;

  @Transform(({ value }) => new Date(value).getTime() || null)
  override expiredDate!: Date;

  @Transform(({ value }) => +value)
  override isInHouseData!: string;

  @Transform(({ value }) => +value)
  override moneyType!: string;

  @Transform(({ value }) => +value)
  override isRemotely!: string;

  @Expose()
  get moneyTypeData() {
    if (!this.moneyType) return null;
    return this.moneyType === MoneyType.VND ? 'VND' : 'USD';
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
  get createdAtText() {
    return timeToTextTransform(this.createdAt, this.lang);
  }

  @Expose()
  get image() {
    return this.postImages && this.postImages.length > 0
      ? `${BUCKET_IMAGE_POST}/${this.id}/${this.postImages[0].image}`
      : this.categories
      ? ''
      : null;
  }

  //   @Expose()
  //   get companyId() {
  //     if (!this.companyInformation) return null;
  //     return this.companyInformation.id;
  //   }
}
