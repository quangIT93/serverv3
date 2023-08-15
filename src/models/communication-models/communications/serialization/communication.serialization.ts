import { Language } from 'src/common/enum';
import { Communication } from '../entities/communication.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import {
  BUCKET_IMAGE_AVATAR,
  BUCKET_IMAGE_COMMUNICATION,
} from 'src/common/constants';
import { categoryTranslator } from 'src/common/helper/translators/category.translator';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';

export class CommunicationSerialization {
  id!: number;
  title!: string;
  content!: string;
  address!: string;
  status!: number;
  salaryMax!: number;
  createdAtText!: string;
  communicationImages!: string[] | null;
  communicationCategories!: CommunicationCategory[] | any;
  profile!: {};
  totalLikes!: number | null;
  totalViews!: number | null;
  totalComments!: number | null;

  [key: string]: any;

  constructor(communication: Communication, lang = Language.VI) {
    this.id = communication.id;
    this.title = communication.title;
    this.content = communication.content;
    this.status = communication.status;
    this.createdAtText = timeToTextTransform(
      communication.createdAt.getTime(),
      lang,
    );
    this.communicationImages = communication.communicationImages
      ? communication.communicationImages?.map(
          (image) =>
            `${BUCKET_IMAGE_COMMUNICATION}/${communication.id}/${image.image}`,
        )
      : null;
    this.communicationCategories = communication.communicationCategories.map(
      (category) => {
        return categoryTranslator(category.parentCategory, lang);
      },
    );
    this.profile = {
      name: communication.profile.name,
      avatar: communication.profile.avatar
        ? `${BUCKET_IMAGE_AVATAR}/${communication.profile.avatar}`
        : null,
    };
    this.totalLikes = communication.communicationLikes
      ? communication.communicationLikes.length
      : 0;
    this.totalViews = communication.communicationViews
      ? communication.communicationViews.length
      : 0;
    this.totalComments = communication.communicationComments
      ? communication.communicationComments.length
      : 0;
  }

  fromEntity(
    communication: Communication,
    lang = Language.VI,
  ): CommunicationSerialization {
    return new CommunicationSerialization(communication, lang);
  }
}
