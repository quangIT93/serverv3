import { Language } from 'src/common/enum';
import { ViewProfile } from '../entities/view_profile.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { ProfileBriefSerialization } from 'src/models/profile-models/profiles/serialization/profile-brief.serialization';

export class ViewProfileSerialization extends ViewProfile {
  @Exclude()
  lang: Language;
  constructor(viewProfile: ViewProfile, lang: Language) {
    super();
    Object.assign(this, viewProfile);
    this.lang = lang;
  }
  @Exclude({ toPlainOnly: true })
  override profile!: Profile;

  @Transform(({ value }) => value?.getTime())
  override createdAt!: Date;

  @Expose()
  get profileData() {
    if (!this.profile) return;
    return new ProfileBriefSerialization(this.profile, this.lang);
  }
}
