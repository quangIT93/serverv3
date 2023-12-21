import { Language } from 'src/common/enum';
import { CandidateBookmark } from '../entities/candidate-bookmark.entity';
import { Exclude, Expose } from 'class-transformer';
import { CompaniesSerialization } from 'src/models/company-models/companies/serialization/companies.serialization';
import { Company } from 'src/models/company-models/companies/entities/company.entity';

export class CandidateBookmarkCompaniesSerialization extends CandidateBookmark {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(candidateBookmark: CandidateBookmark, lang: Language) {
    super();
    Object.assign(this, candidateBookmark);
    this.lang = lang;
  }

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override recruitId!: string;

  @Exclude({ toPlainOnly: true })
  override candidateId!: string;

  @Exclude({ toPlainOnly: true })
  override company!: Company;

  @Expose()
  get CompanyData() {
    if (!this.company) return null;
    return new CompaniesSerialization(this.company, this.lang);
  }
}
