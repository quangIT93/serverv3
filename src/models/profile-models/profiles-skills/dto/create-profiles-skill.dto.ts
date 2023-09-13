import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesSkillDto {

    accountId!: string;

    @ApiProperty({ type: 'int', description: 'skill_level_id', nullable: false })
    @IsNotEmpty()
    skillLevelId!:number;

    @ApiProperty({ type: 'varchar', description: 'skill_name', nullable: false })
    @IsNotEmpty()
    skillName!:string;
}
