import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LevelType } from "../../types/level-type/entities/level-types.entity";

@Entity('profiles_skills')
export class ProfilesSkill {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'skill_name' })
    skillName!: string;

    @Column({type: 'int', name: 'skill_level_id'})
    skillRoleId!:number;

    // @Transform(({ value }) => new Date(value).getTime())
    // @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    // createdAt!: Date;

    // @Transform(({ value }) => new Date(value).getTime())
    // @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    // updatedAt!: Date;

    @ManyToOne(() => LevelType, levelType => levelType.profileSkill)
    @JoinColumn({name: 'skill_level_id'})
    levelType!:LevelType;
}
