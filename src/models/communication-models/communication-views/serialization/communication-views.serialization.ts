import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationView } from '../entities/communication-view.entity';

export class CommunicationViewSerialization {
  communicationId!: number;
  accountId!: string;
  createdAt!: number;
  avatar!: string | null;
  name!: string;

  [key: string]: any;

  constructor(communicationView: CommunicationView) {
    this.communicationId = communicationView.communicationId;
    this.accountId = communicationView.accountId;
    this.createdAt = new Date(communicationView.createdAt).getTime();
    this.avatar = communicationView.profile.avatar ? `${BUCKET_IMAGE_AVATAR}/${communicationView.profile.avatar}` : null;
    this.name = communicationView.profile.name;
  }

  fromEntity(
    communicationView: CommunicationView,
  ): CommunicationViewSerialization {
    return new CommunicationViewSerialization(communicationView);
  }
}
