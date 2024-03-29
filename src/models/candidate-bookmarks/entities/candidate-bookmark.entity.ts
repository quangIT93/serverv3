import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('candidate_bookmarked')
export class CandidateBookmark {
  @PrimaryColumn({ type: 'varchar', nullable: false, name: 'candidate_id' })
  candidateId!: string;

  @PrimaryColumn({ type: 'varchar', nullable: false, name: 'recruit_id' })
  recruitId!: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => Profile, (profile) => profile.candidateBookmarked)
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'accountId' })
  profile!: Profile;

  @ManyToOne(() => Company, (company) => company)
  @JoinColumn({ name: 'recruit_id', referencedColumnName: 'accountId' })
  company!: Company;
}
