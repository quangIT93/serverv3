import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_categories')
export class ProfilesEducation {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 50, name: 'company_name' })
    companyName!: string;

    @Column({ type: 'varchar', length: 50, name: 'major' })
    major!: string;

    @Column({ type: 'varchar', length: 20, name: 'start_date' })
    startDate!: string; 

    @Column({ type: 'varchar', length: 20, name: 'end_date' }) 
    endDate!: string;

    @Column({ type: 'varchar', length: 50, name: 'extra_information' })
    extraInformation!: string;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt!: Date;


    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt!: Date;

}
