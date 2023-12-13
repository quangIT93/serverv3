import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'company_view' })
export class CompanyView {
    @PrimaryColumn({ name: 'account_id', type: 'varchar', length: 50 })
    accountId!: string;

    @PrimaryColumn({ name: 'company_id', type: 'int' })
    companyId!: number;

    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}