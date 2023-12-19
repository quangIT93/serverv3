import { Exclude, Expose } from 'class-transformer';
import { Language } from 'src/common/enum';
import { User } from 'src/models/users/entities';
import { ProfileBriefSerialization } from 'src/models/profile-models/profiles/serialization/profile-brief.serialization';
import { CompanyView } from '../entities/company-view.entity';

export class CompanyViewCandidateSerialization extends CompanyView {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(companyView: CompanyView, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, companyView);
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
