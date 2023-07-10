import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_categories')
export class ProfilesLocation{

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 20, nullable: false, name: 'location_id' })
    locationId!: string;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

}
