import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('communications')
export class Communication {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 500, nullable: false, name: 'title' })
    title!: string;

    @Column({ type: 'text', nullable: false, name: 'content' })
    content!: string;

    @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
    status!: number;

    @Column({ type: 'date', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'date', nullable: false, name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    
}
