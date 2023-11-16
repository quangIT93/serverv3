import { Exclude, Expose } from 'class-transformer';
import { Profile } from '../entities';
import { Language } from 'src/common/enum';
import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { hideName } from 'src/common/helper/translators/candidate.translator';

export class ProfileBriefRatedSerialization extends Profile {
  @Exclude()
  lang!: Language;

  constructor(profile: Profile, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, profile);
  }

  @Exclude({ toPlainOnly: true })
  override birthday!: string;

  @Exclude({ toPlainOnly: true })
  override address!: string;

  @Exclude({ toPlainOnly: true })
  override gender!: number;

  @Exclude({ toPlainOnly: true })
  override introduction!: string;

  @Exclude({ toPlainOnly: true })
  override phone!: string;

  @Exclude({ toPlainOnly: true })
  override email!: string;

  @Exclude({ toPlainOnly: true })
  override facebook!: string;

  @Exclude({ toPlainOnly: true })
  override linkedin!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override jobTypeName!: string;

  @Exclude({ toPlainOnly: true })
  override jobTypeId!: number;

  @Exclude({ toPlainOnly: true })
  override cvUrl!: string;

  @Exclude({ toPlainOnly: true })
  override isSearch!: number;

  @Exclude({ toPlainOnly: true })
  override avatar!: string;

  @Exclude({ toPlainOnly: true })
  override name!: string;

  @Expose()
  get avatarPath() {
    if (!this.avatar) return null;
    return `${BUCKET_IMAGE_AVATAR}/${this.avatar}`;
  }

  @Expose()
  get nameHide() {
    if (!this.name) return 'Your name';
    return hideName(this.name);
  }
}
