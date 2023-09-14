import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profiles/entities";
import { JobType } from "src/models/job-types/entities/job-type.entity";

@Entity('profiles_jobs')
export class ProfilesJob {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'account_id', length: 50, type: 'varchar'})
    accountId!: string;

    @Column({ name: 'job_type_id', type: 'int'})
    jobTypeId!: number;

    @ManyToOne(() => Profile, profile => profile.profilesJob)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

    @ManyToOne(() => JobType, profile => profile.profilesJob)
    @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
    jobType!: JobType;
}
