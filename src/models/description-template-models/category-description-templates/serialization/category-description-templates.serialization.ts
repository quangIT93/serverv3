import { Exclude, Transform } from 'class-transformer';
import { CategoryDescriptionTemplate } from '../entities/category-description-template.entity';
import { Language } from 'src/common/enum';

export class CategoryDescriptionTemplateSerialization extends CategoryDescriptionTemplate {
  @Exclude()
  lang: Language;

  constructor(template: CategoryDescriptionTemplate, lang: Language) {
    super();
    Object.assign(this, template);
    this.lang = lang;
  }

  @Transform(({ value }) => value?.getTime())
  override createdAt!: Date;

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;
}
