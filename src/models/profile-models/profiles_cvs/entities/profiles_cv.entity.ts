import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profiles/entities";

@Entity('profiles_cvs')
export class ProfilesCv {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 50, nullable: false, name: 'account_id'})
    accountId!:string;

    @Column({type: 'varchar', length: 255, nullable: false, name: 'name', default: 'HiJob CV'})
    name!:string;

    @Column({type: 'varchar', length: 200, nullable: false, name: 'image'})
    image!:string;

    @Column({type: 'int', nullable: false, default: 1, name: 'status'})
    status!: number;

    @ManyToOne(() => Profile, profile => profile.profilesCv)
    @JoinColumn({name: 'account_id'})
    profile!: Profile;
}
