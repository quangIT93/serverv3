import { Exclude, Expose } from 'class-transformer';
import { SalaryType } from '../entities/salary-type.entity';
import { Language } from 'src/common/enum';

export class SalaryTypeSerialization extends SalaryType {
  @Exclude()
  lang!: Language;

  constructor(salaryType: SalaryType, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, salaryType);
  }

  @Exclude({ toPlainOnly: true })
  override valueKo!: string;

  @Exclude({ toPlainOnly: true })
  override valueEn!: string;

  @Exclude({ toPlainOnly: true })
  override value!: string;

  @Expose()
  get name() {
    if (!this.value) return null;
    if (this.lang === Language.EN) return this.valueEn;
    if (this.lang === Language.KO) return this.valueKo;
    return this.value;
  }
}
