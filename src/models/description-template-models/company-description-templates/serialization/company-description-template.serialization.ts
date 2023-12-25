import { Exclude, Transform } from 'class-transformer';
import { CompanyDescriptionTemplate } from '../entities/company-description-template.entity';
import { Language } from 'src/common/enum';

export class CompanyDescriptionTemplateSerialization extends CompanyDescriptionTemplate {
  @Exclude()
  lang: Language;

  constructor(template: CompanyDescriptionTemplate, lang: Language) {
    super();
    Object.assign(this, template);
    this.lang = lang;
  }

  @Transform(({ value }) => value?.getTime())
  override createdAt!: Date;

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;
}
