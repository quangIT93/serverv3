import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesSkillDto {

    accountId!: string;

    @ApiProperty({ type: 'int', description: 'skill_role_id', nullable: false })
    @IsNotEmpty()
    skillRoleId!:number;
}
