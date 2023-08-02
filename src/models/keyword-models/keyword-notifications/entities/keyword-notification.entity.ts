import { ParentCategory } from "src/models/categories/parents/entities/parent.entity";
import { District } from "src/models/locations/districts/entities";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('keywords_notification')
export class KeywordNotification {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id'})
    accoundId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'keyword' })
    keyword!: string;

    @Column({ type: 'tinyint', nullable: false, name: 'status' })
    status!: number;

    @Column({ type: 'datetime', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'varchar', nullable: false, name: 'district_id'})
    districtId!: string;

    @Column({ type: 'varchar', nullable: false, name: 'category_id'})
    categoryId!: number;

    @ManyToMany(() => ParentCategory, parentCategory => parentCategory.id)
    @JoinTable({
        name: 'keyword_categories',
        joinColumn: {
            name: 'keyword_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories: ParentCategory[] | undefined;

    @ManyToMany(() => District, district => district.id)
    @JoinTable({
        name: 'keyword_districts',
        joinColumn: {
            name: 'keyword_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'district_id',
            referencedColumnName: 'id'
        }
    })
    districts: District[] | undefined;
}
