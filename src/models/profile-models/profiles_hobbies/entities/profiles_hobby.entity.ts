import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_hobbies')
export class ProfilesHobby {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 50, name: 'account_id'})
    accountId!: string;

    @Column({type: 'varchar', length: 1000, name: 'description'})
    description!: string;
}
