import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'search_history' })
export class SearchHistory {

    @PrimaryColumn({ name: 'account_id', type: 'varchar', length: 50 })
    accountId!: string;

    @PrimaryColumn({ name: 'search_key', type: 'varchar', length: 255 })
    searchKey!: string;

    @Column({ name: 'count', type: 'int', default: 1 })
    count!: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}
