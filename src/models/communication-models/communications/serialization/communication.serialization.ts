// import { Exclude, Expose, Transform } from 'class-transformer';
import { Language } from 'src/common/enum';
import { Communication } from '../entities/communication.entity';
// import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { BUCKET_IMAGE_COMMUNICATION } from 'src/common/constants';
import { categoryTranslator } from 'src/common/helper/translators/category.translator';
// import { categoryTranslator } from 'src/common/helper/translators';

export class CommunicationSerialization  {
    id!: number;
    // accountId!: string;
    title!: string;
    content!:string;
    address!: string;
    status!: number;
    salaryMax!: number;
    createdAt!: number;
    updatedAt!: number;
    communicationImages!: string[];
    communicationCategories!: CommunicationCategory[] | any

    [key: string]: any;


    constructor(communication: Communication, lang = Language.VI) {
        this.id = communication.id;
        this.title = communication.title;
        // this.accountId = communication.accountId;
        this.content = communication.content;
        this.status = communication.status;
        this.createdAt = new Date(communication.createdAt).getTime();
        this.updatedAt = new Date(communication.updatedAt).getTime();
        this.communicationImages = communication.communicationImages.map((image) => `${BUCKET_IMAGE_COMMUNICATION}/${communication.id}/${image.image}`);
        this.communicationCategories =  communication.communicationCategories.map((category) => {
            return categoryTranslator(category.parentCategory, lang);
        })
        
    }

    fromEntity(communication: Communication, lang= Language.VI): CommunicationSerialization {
        return new CommunicationSerialization(communication, lang);
    }
}
