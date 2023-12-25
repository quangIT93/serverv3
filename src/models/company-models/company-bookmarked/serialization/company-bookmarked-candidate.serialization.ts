import { Exclude, Expose } from 'class-transformer';
import { CompanyBookmarked } from '../entities/company-bookmarked.entity';
import { Language } from 'src/common/enum';
import { User } from 'src/models/users/entities';
import { ProfileBriefSerialization } from 'src/models/profile-models/profiles/serialization/profile-brief.serialization';

export class CompanyBookmarkedCandidateSerialization extends CompanyBookmarked {
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
  override user!: User;

  @Expose()
  get profileData() {
    return Object.assign(
      new ProfileBriefSerialization(this.user.profile, this.lang),
    );
  }
}
