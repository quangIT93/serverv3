// import { Language } from 'src/common/enum';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { BUCKET_IMAGE_AVATAR, BUCKET_IMAGE_COMMUNICATION_COMMENT } from 'src/common/constants';

export class CommunicationCommentSerialization {
  id!: number;
  // accountId!: string;
  communicationId!:number;
  content!: string;
  address!: string;
  status!: number;
  createdAt!: number;
  updatedAt!: number;
  communicationCommentImages!: string[] | {};
  profile!: {};


  [key: string]: any;

  constructor(communicationComment: CommunicationComment) {
    // console.log(lang);
    this.id = communicationComment.id;
    // this.accountId = communication.accountId;
    this.communicationId = communicationComment.communicationId;
    this.content = communicationComment.content;
    this.status = communicationComment.status;
    this.createdAt = new Date(communicationComment.createdAt).getTime();
    this.updatedAt = new Date(communicationComment.updatedAt).getTime();
    this.profile = {
      name: communicationComment.profile.name,
      avatar: communicationComment.profile.avatar
        ? `${BUCKET_IMAGE_AVATAR}/${communicationComment.profile.avatar}`
        : null,
    };
    this.communicationCommentImages = communicationComment.communicationCommentImages.map(
      (image) =>
        `${BUCKET_IMAGE_COMMUNICATION_COMMENT}/${communicationComment.id}/${image.image}`,
    );
  }

  fromEntity(
    communicationComment: CommunicationComment,
    // lang = Language.VI,
  ): CommunicationCommentSerialization {
    return new CommunicationCommentSerialization(communicationComment);
  }
}
