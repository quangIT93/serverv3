import { Language } from 'src/common/enum';
import { CompanyRating } from '../entities/company-rating.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from 'src/models/users/entities';
import { ProfileBriefRatedSerialization } from 'src/models/profile-models/profiles/serialization/profile-brief-rated.serialization';

export class CompanyRatingsSerialization extends CompanyRating {
  @Exclude()
  lang!: Language;

  constructor(companyRating: CompanyRating, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, companyRating);
  }
  @Exclude({ toPlainOnly: true })
  override account!: User;

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Transform(({ value }) => new Date(value).getTime())
  override updatedAt!: Date;

  @Expose()
  get profileData() {
    if (!this.account) return null;
    if (!this.account.profile) return null;
    return new ProfileBriefRatedSerialization(this.account.profile, this.lang);
  }
}
