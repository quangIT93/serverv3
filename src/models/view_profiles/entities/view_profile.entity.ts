import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
