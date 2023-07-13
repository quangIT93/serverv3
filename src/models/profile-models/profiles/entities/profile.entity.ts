import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { ProfilesEducation } from "../../profiles-educations/entities/profiles-education.entity";
import { ProfilesExperiences } from "../../profiles-experiences/entities/profiles-experiences.entity";
import { ChildCategory } from "src/models/categories/children/entities/child.entity";
// import { ProfilesLocation } from "../../profiles-locations/entities/profiles-locations.entity";
import { District } from "src/models/locations/districts/entities";
import { Company } from "src/models/company-models/companies/entities/company.entity";
import { Province } from "src/models/locations/provinces/entities";

@Entity('profiles') // table name
export class Profile {
    @PrimaryColumn({ type: 'varchar', length: 50, nullable: false, name: 'id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 20, nullable: false, name: 'birthday' })
    birthday!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    address!: string;

    // @Transform(({ value }) => +value)
    @Column({ type: 'tinyint', nullable: false })
    gender!: number;

    @Column({ type: 'varchar', length: 500, nullable: false })
    introduction!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone!: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    facebook!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    linkedin!: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    avatar!: string;

    @Column({ type: 'datetime', nullable: false, name: 'created_at' })
    createdAt!: Date;

    @Column({ type: 'datetime', nullable: false, name: 'updated_at' })
    updatedAt!: Date;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'cv_url' })
    cvUrl!: string;

    @OneToMany(() => ProfilesEducation, profilesEducation => profilesEducation.profile)
    @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
    profilesEducations!: ProfilesEducation[];
    
    @OneToMany(() => ProfilesExperiences, profilesExperiences => profilesExperiences.profile)
    @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
    profilesExperiences!: ProfilesExperiences[];

    @ManyToMany(() => District, district => district.id)
    @JoinTable({
        name: 'profiles_locations',
        joinColumn: {
            name: 'account_id',
            referencedColumnName: 'accountId'
        },
        inverseJoinColumn: {
            name: 'location_id',
            referencedColumnName: 'id'
        }
    })
    profilesLocations!: District[];
    
    @ManyToMany(() => ChildCategory, childCategory => childCategory.id)
    @JoinTable({
        name: 'profiles_categories',
        joinColumn: {
            name: 'account_id',
            referencedColumnName: 'accountId'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    childCategories!: ChildCategory[];

    @OneToOne(_ => Company, company => company.profile)
    @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
    company!: Company;

    @ManyToOne(() => Province, province => province.id)
    @JoinColumn({ name: 'address', referencedColumnName: 'id' })
    province!: Province;
}
