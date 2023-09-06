import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles_interships')
export class ProfilesIntership {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, name: 'account_id', nullable: false })
  accountId!: string;

  @Column({ type: 'varchar', length: 255, name: 'job_title', nullable: false })
  jobTitle!: string;

  @Column({ type: 'varchar', length: 255, name: 'employer', nullable: false })
  employer!: string;

  @Column({
    type: 'varchar',
    length: 1000,
    name: 'description',
    nullable: false,
  })
  description!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
  startDate!: string | null;

  @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
  endDate!: string | null;
}
