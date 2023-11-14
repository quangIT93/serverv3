import { Exclude, Expose } from 'class-transformer';
import { ParentCategory } from '../entities/parent.entity';
import { Language } from 'src/common/enum';

export class ParentCategoriesSerialization extends ParentCategory {
  @Exclude()
  lang!: Language;

  constructor(parentCategory: ParentCategory, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, parentCategory);
  }

  @Exclude({ toPlainOnly: true })
  override name!: string;

  @Exclude({ toPlainOnly: true })
  override nameEn!: string;

  @Exclude({ toPlainOnly: true })
  override nameKor!: string;

  @Exclude({ toPlainOnly: true })
  override image!: string;

  @Exclude({ toPlainOnly: true })
  override defaultPostImage!: string;

  @Exclude({ toPlainOnly: true })
  override status!: number;

  @Expose()
  get nameText() {
    if (!this.name) return null;
    if (this.lang === Language.EN) return this.nameEn;
    if (this.lang === Language.KO) return this.nameKor;
    return this.name;
  }
}
