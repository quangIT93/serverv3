import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('profiles')
export class Profile {
    @PrimaryColumn({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    birthday!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    address!: string;

    @Column({ type: 'tinyint', nullable: false })
    gender!: number;

    @Column({ type: 'varchar', length: 500, nullable: false })
    introduction!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone!: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    facebook!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    linkedin!: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    avatar!: string;

    @Column({ type: 'datetime', nullable: false, name: 'created_at' })
    createdAt!: Date;

    @Column({ type: 'datetime', nullable: false, name: 'updated_at' })
    updatedAt!: Date;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'cv_url' })
    cvUrl!: string;

    // @ManyToOne(() => Profile, (profile) => profile.accountId)
    
}
