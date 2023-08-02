import { Entity, PrimaryColumn } from "typeorm";

@Entity('keyword_districts')
export class KeywordDistrict {
    @PrimaryColumn()
    keywordId!: number;

    @PrimaryColumn()
    districtId!: number;
}
