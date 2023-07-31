import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Province } from "../../provinces/entities";
import { Location } from "../../location.class";


@Entity('districts')
export class District extends Location {

    @Column({ type: 'varchar', name: 'province_id' })
    provinceId!: string;

    @ManyToOne(() => Province, province => province.id)
    @JoinColumn({ name: 'province_id' })
    province!: Province;
}
    