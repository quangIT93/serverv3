import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_references')
export class ProfilesReference {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!:string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'full_name' })
    fullName!:string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'company_name' })
    companyName!:string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'phone' })
    phone!:string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'email' })
    email!:string;

}
