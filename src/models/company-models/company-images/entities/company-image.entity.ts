import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company_images')
export class CompanyImage {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', nullable: false, name: 'company_id' })
    companyId!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', nullable: false, default: 1 })
    status!: number;

    @Column({
        type: 'datetime',
        nullable: false,
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;
    
}
