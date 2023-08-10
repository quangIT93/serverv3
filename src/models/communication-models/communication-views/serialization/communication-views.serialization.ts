import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationView } from '../entities/communication-view.entity';

export class CommunicationViewSerialization  {
    communicationId!: number;
    accountId!: string;
    createdAt!: number;
    avartar!: string;
    name!: string;

    [key: string]: any;


    constructor(communicationView: CommunicationView) {
        this.communicationId = communicationView.communicationId;
        this.accountId = communicationView.accountId;
        this.createdAt = new Date(communicationView.createdAt).getTime();
        this.avartar = `${BUCKET_IMAGE_AVATAR}/${communicationView.profile.avatar}`;
        this.name = communicationView.profile.name
    }

    fromEntity(communicationView: CommunicationView): CommunicationViewSerialization {
        return new CommunicationViewSerialization(communicationView);
    }
}
