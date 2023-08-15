import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationLike } from '../entities/communication-like.entity';
import { Language } from 'src/common/enum';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';

export class CommunicationLikeSerialization {
  communicationId!: number;
  accountId!: string;
  createdAtText!: string;
  avatar!: string | null;
  name!: string;

  [key: string]: any;

  constructor(communicationLike: CommunicationLike, lang = Language.VI) {
    this.communicationId = communicationLike.communicationId;
    this.accountId = communicationLike.accountId;
    this.createdAtText = timeToTextTransform(
      communicationLike.createdAt.getTime(),
      lang,
    );
    this.avatar = communicationLike.profile.avatar
      ? `${BUCKET_IMAGE_AVATAR}/${communicationLike.profile.avatar}`
      : null;
    this.name = communicationLike.profile.name;
  }

  fromEntity(
    communicationLike: CommunicationLike,
    lang = Language.VI,
  ): CommunicationLikeSerialization {
    return new CommunicationLikeSerialization(communicationLike, lang);
  }
}
