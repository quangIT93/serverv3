import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LanguageType } from "../../types/language-types/entities/language-type.entity";

@Entity('profiles_languages')
export class ProfileLanguage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({type: 'int', name: 'language_level_id'})
    languageRoleId!:number;

    @ManyToOne(() => LanguageType, languageType => languageType.profileLanguages)
    @JoinColumn({name: 'language_level_id'})
    levelTypeLanguage!:LanguageType;
}
