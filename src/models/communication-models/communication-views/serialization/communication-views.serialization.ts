import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationView } from '../entities/communication-view.entity';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { Language } from 'src/common/enum';

export class CommunicationViewSerialization {
  communicationId!: number;
  accountId!: string;
  createdAtText!: string;
  avatar!: string | null;
  name!: string;

  [key: string]: any;

  constructor(communicationView: CommunicationView, lang = Language.VI) {
    this.communicationId = communicationView.communicationId;
    this.accountId = communicationView.accountId;
    this.createdAtText = timeToTextTransform(
      communicationView.createdAt.getTime(),
      lang,
    );
    this.avatar = communicationView.profile.avatar
      ? `${BUCKET_IMAGE_AVATAR}/${communicationView.profile.avatar}`
      : null;
    this.name = communicationView.profile.name;
  }

  fromEntity(
    communicationView: CommunicationView,
    lang = Language.VI,
  ): CommunicationViewSerialization {
    return new CommunicationViewSerialization(communicationView, lang);
  }
}
