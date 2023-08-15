import { BUCKET_IMAGE_COMMUNICATION } from 'src/common/constants';
import { CommunicationBookmarked } from '../entities/communication-bookmarked.entity';

export class CommunicationBookmarkedSerialization {
  communicationId!: number;
  // accountId!: string;
  createdAt!: number;
  communicaton!: {};

  [key: string]: any;

  constructor(communicationBookmarked: CommunicationBookmarked) {
    this.communicationId = communicationBookmarked.communicationId;
    // this.accountId = communicationBookmarked.accountId;
    this.createdAt = new Date(communicationBookmarked.createdAt).getTime();
    this.communicaton = {
      title: communicationBookmarked.communication?.title
        ? communicationBookmarked.communication?.title
        : '',
      content: communicationBookmarked.communication?.content
        ? communicationBookmarked.communication?.content
        : '',
      createdAt: new Date(communicationBookmarked.createdAt).getTime(),
      communicationImages:
        communicationBookmarked.communication?.communicationImages.map(
          (image) =>
            `${BUCKET_IMAGE_COMMUNICATION}/${communicationBookmarked.communication?.id}/${image.image}`,
        ),
      communicationLikes: communicationBookmarked.communication?.communicationLikes.length,
      communicationComments: communicationBookmarked.communication?.communicationComments.length,
      communicationViews: communicationBookmarked.communication?.communicationViews.length
    };
  }

  fromEntity(
    communicationBookmarked: CommunicationBookmarked,
  ): CommunicationBookmarkedSerialization {
    return new CommunicationBookmarkedSerialization(communicationBookmarked);
  }
}
