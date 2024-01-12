import { Exclude, Expose, Transform } from 'class-transformer';
import { PostMedia } from '../entities/post-media.entity';
import { Language } from 'src/common/enum';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import {
  BUCKET_IMAGE_COMPANIES_LOGO,
  BUCKET_IMAGE_POST,
} from 'src/common/constants';

export class PostMediasSerialization extends PostMedia {
  @Exclude()
  lang!: Language;

  constructor(postMedia: PostMedia, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, postMedia);
  }

  @Exclude({ toPlainOnly: true })
  override image!: string;

  @Expose()
  get imageThumb() {
    if (!this.image) return null;
    return `${BUCKET_IMAGE_POST}/${this.postId}/${this.image}`;
  }

  @Transform(({ value }) => value?.getTime())
  override createdAt!: Date;

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;

  @Transform(({ value }) => {
    return {
      ...value,
      logo: `${BUCKET_IMAGE_COMPANIES_LOGO}/${value.id}/${value.logo}`,
    };
  })
  override company!: Company;

  @Expose()
  get statusPost() {
    if (!this.post.status) return;
    return this.post.status;
  }
}
