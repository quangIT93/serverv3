import { Company } from "src/models/company-models/companies/entities/company.entity";
import { Profile } from "src/models/profile-models/profiles/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'view_profiles'})
export class ViewProfile {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, name: 'recruit_id' , length: 50})
    recruitId!:string;

    @Column({ type: 'varchar', nullable: false, name: 'profile_id' , length: 50})
    profileId!:string;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!:Date;

    @ManyToOne(() => Profile, (profile) => profile.viewProfiles)
    @JoinColumn({name: 'profile_id'})
    profile!: Profile;

    @ManyToOne(() => Company, (company) => company.viewProfiles)
    @JoinColumn({name: 'recruit_id', referencedColumnName: 'accountId' })
    company!: Company;
}
