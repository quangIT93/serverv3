import { User } from 'src/models/users/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity('company_Bookmarked')
export class CompanyBookmarked extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false, name: 'account_id' })
  accountId!: string;

  @PrimaryColumn({ type: 'int', nullable: false, name: 'company_id' })
  companyId!: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'account_id' })
  user!: User;

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company!: Company;
}
