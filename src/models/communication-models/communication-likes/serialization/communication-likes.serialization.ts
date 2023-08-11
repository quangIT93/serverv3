import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationLike } from '../entities/communication-like.entity';

export class CommunicationLikeSerialization {
  communicationId!: number;
  accountId!: string;
  createdAt!: number;
  avatar!: string | null;
  name!: string;

  [key: string]: any;

  constructor(communicationLike: CommunicationLike) {
    this.communicationId = communicationLike.communicationId;
    this.accountId = communicationLike.accountId;
    this.createdAt = new Date(communicationLike.createdAt).getTime();
    this.avatar = communicationLike.profile.avatar ? `${BUCKET_IMAGE_AVATAR}/${communicationLike.profile.avatar}` : null;
    this.name = communicationLike.profile.name;
  }

  fromEntity(
    communicationLike: CommunicationLike,
  ): CommunicationLikeSerialization {
    return new CommunicationLikeSerialization(communicationLike);
  }
}
