import { Language } from 'src/common/enum';
import { CommunicationComment } from '../entities/communication-comment.entity';
import {
  BUCKET_IMAGE_AVATAR,
  BUCKET_IMAGE_COMMUNICATION_COMMENT,
} from 'src/common/constants';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';

export class CommunicationCommentSerialization {
  id!: number;
  communicationId!: number;
  content!: string;
  address!: string;
  status!: number;
  createdAtText!: string;
  communicationCommentImages!: string[] | {};
  profile!: {};

  [key: string]: any;

  constructor(communicationComment: CommunicationComment, lang = Language.VI) {
    this.id = communicationComment.id;
    this.communicationId = communicationComment.communicationId;
    this.content = communicationComment.content;
    this.status = communicationComment.status;
    this.createdAtText = timeToTextTransform(
      communicationComment.createdAt.getTime(),
      lang,
    );
    this.profile = {
      name: communicationComment.profile.name,
      avatar: communicationComment.profile.avatar
        ? `${BUCKET_IMAGE_AVATAR}/${communicationComment.profile.avatar}`
        : null,
    };
    this.communicationCommentImages =
      communicationComment.communicationCommentImages.map(
        (image) =>
          `${BUCKET_IMAGE_COMMUNICATION_COMMENT}/${communicationComment.id}/${image.image}`,
      );
  }

  fromEntity(
    communicationComment: CommunicationComment,
    lang = Language.VI,
  ): CommunicationCommentSerialization {
    return new CommunicationCommentSerialization(communicationComment, lang);
  }
}
