import { Entity, PrimaryColumn } from "typeorm";

@Entity('keyword_categories')
export class KeywordCategory {
    @PrimaryColumn()
    keywordId!: number;

    @PrimaryColumn()
    categoryId!: number;
}
