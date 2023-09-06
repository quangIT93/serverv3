import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_awards')
export class ProfilesAward {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'varchar',length:50,name:'account_id',nullable:false})
    accountId!:string;

    @Column({type:'varchar',length:255,name:'title',nullable:false})
    title!:string;

    @Column({type:'varchar',length:255,name:'company_name',nullable:false})
    companyName!:string;

    @Column({type:'varchar',length:1000,name:'description',nullable:false})
    description!:string;
}
