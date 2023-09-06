import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles_activities')
export class ProfilesActivity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'account_id', type: 'varchar', nullable: false, length: 50 })
  accountId!: string;

  @Column({ name: 'title', type: 'varchar', nullable: false, length: 255 })
  title!: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  employer!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
    name: 'description',
  })
  description!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
  startDate!: Date;

  @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
  endDate!: Date;
}
