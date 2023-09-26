import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'academic_types'})
export class AcademicType {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: 'varchar', length: 50, nullable: false, name: 'value'})
    value!:string;

    @Column({type: 'varchar', length: 15, nullable: false, name: 'value_en'})
    valueEn!:string;

    @Column({type: 'varchar', length: 10, nullable: false, name: 'value_ko'})
    valueKo!:string;

    @Column({type: 'tinyint', nullable: false, default: 1, name: 'status'})
    status!:number;
}
