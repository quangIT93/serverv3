import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationLike } from '../entities/communication-like.entity';

export class CommunicationLikeSerialization  {
    communicationId!: number;
    accountId!: string;
    createdAt!: number;
    updatedAt!: number;
    avartar!: string;
    name!: string;

    [key: string]: any;


    constructor(communicationLike: CommunicationLike) {
        this.communicationId = communicationLike.communicationId;
        this.accountId = communicationLike.accountId;
        this.createdAt = new Date(communicationLike.createdAt).getTime();
        this.updatedAt = new Date(communicationLike.updatedAt).getTime();
        this.avartar = `${BUCKET_IMAGE_AVATAR}/${communicationLike.profile.avatar}`;
        this.name = communicationLike.profile.name
    }

    fromEntity(communicationLike: CommunicationLike): CommunicationLikeSerialization {
        return new CommunicationLikeSerialization(communicationLike);
    }
}
