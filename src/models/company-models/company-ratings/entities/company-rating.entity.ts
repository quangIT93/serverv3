// import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { User } from 'src/models/users/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company_ratings')
export class CompanyRating {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, name: 'company_id' })
  companyId!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'tinyint', name: 'star' })
  star!: number;

  @Column({ type: 'text', name: 'comment' })
  comment!: string;

  @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
  status!: number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => Company, (company) => company.companyRatings)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @ManyToOne(() => User, (user) => user.companyRatings)
  @JoinColumn({ name: 'account_id' })
  account!: User;
}
