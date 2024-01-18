import { Exclude, Expose, Transform } from 'class-transformer';
import { Post } from '../../posts/entities';
import { Ward } from 'src/models/locations/wards/entities';

import { PostImages } from '../../posts-images/entities/post-images.entity';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { Language, MoneyType } from 'src/common/enum';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { JobType } from 'src/models/job-types/entities/job-type.entity';

import { locationTranslator } from 'src/common/helper/translators';
import { CompanyResourceSerialization } from 'src/models/company-resources/serialization/company-resource.serialization';
import { SalaryTypeSerialization } from 'src/models/salary-types/serialization/salary-type.serialization';
import { JobTypesSerialization } from 'src/models/job-types/serialization/job_types.serialization';
// import { BadRequestException } from '@nestjs/common';

export class SearchPostSerialization extends Post {
  @Exclude()
  lang!: Language;
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
  override jobType!: number;

  @Exclude({ toPlainOnly: true })
  override companyResource!: any;

  @Exclude({ toPlainOnly: true })
  override salaryTypeData!: any;

  @Exclude({ toPlainOnly: true })
  override profile!: any;

  @Exclude({ toPlainOnly: true })
  override createdAtDate!: Date;

  @Exclude({ toPlainOnly: true })
  override bookmarks!: any;

  @Exclude({ toPlainOnly: true })
  override description!: string;

  @Exclude({ toPlainOnly: true })
  override phoneContact!: string;

  @Exclude({ toPlainOnly: true })
  override email!: string;

  @Exclude({ toPlainOnly: true })
  override url!: string;

  @Exclude({ toPlainOnly: true })
  override companyResourceId!: number;

  @Exclude({ toPlainOnly: true })
  override isInHouseData!: string;

  @Exclude({ toPlainOnly: true })
  override isDatePeriod!: number;

  @Exclude({ toPlainOnly: true })
  override startDate!: string | null;

  @Exclude({ toPlainOnly: true })
  override endDate!: string | null;

  @Exclude({ toPlainOnly: true })
  override startTime!: string;

  @Exclude({ toPlainOnly: true })
  override endTime!: string;

  @Exclude({ toPlainOnly: true })
  override expiredDate!: Date | null;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Transform(({ value }) => +value)
  override isRemotely!: string;

  @Transform(({ value }) => {
    if (!value) return null;
    return value === MoneyType.VND ? 'VND' : 'USD';
  })
  override moneyType!: string;

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
}
