import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesSkillDto {

    accountId!: string;

    @ApiProperty({ type: 'number', format: 'number', nullable: false })
    @IsNotEmpty()
    skillLevelId!:number;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    skillName!:string;
}
