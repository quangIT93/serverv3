import { Communication } from '../entities/communication.entity';
import { Exclude, Expose } from 'class-transformer';
import { Language } from 'src/common/enum';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CommunicationView } from '../../communication-views/entities/communication-view.entity';
import { CommunicationComment } from '../../communication-comments/entities/communication-comment.entity';
import { CommunicationLike } from '../../communication-likes/entities/communication-like.entity';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';

export class CommunicationHiJobWorkingSerialization extends Communication {
  @Exclude({ toPlainOnly: true })
  lang: Language;

  constructor(communication: Communication, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, communication);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override status!: number;

  @Expose({ toPlainOnly: true })
  override title!: string;

  @Exclude({ toPlainOnly: true })
  override content!: string;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Expose()
  get createdAtText() {
    return timeToTextTransform(this.createdAt.getTime(), this.lang);
  }

  @Exclude({ toPlainOnly: true })
  override communicationImages!: CommunicationImage[];

  @Exclude({ toPlainOnly: true })
  override communicationCategories!: CommunicationCategory[];

  @Exclude({ toPlainOnly: true })
  override profile!: Profile;

  @Exclude({ toPlainOnly: true })
  override communicationViews!: CommunicationView[];

  @Exclude({ toPlainOnly: true })
  override communicationComments!: CommunicationComment[];

  @Exclude({ toPlainOnly: true })
  override communicationLikes!: CommunicationLike[];

  @Expose({ toPlainOnly: true })
  get totalLikes() {
    return this.communicationLikes.length;
  }

  @Expose({ toPlainOnly: true })
  get totalViews() {
    return this.communicationViews.length;
  }

  @Expose({ toPlainOnly: true })
  get totalComments() {
    return this.communicationComments.length;
  }

  @Expose()
  get profileData() {
    return {
      name: this.profile ? this.profile.name : null,
    };
  }
}
