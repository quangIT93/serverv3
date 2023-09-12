import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfileLanguageDto {
    
    accountId!: string;

    @ApiProperty({type: 'int', name: 'language_role_id', nullable: false})
    @IsNotEmpty()
    languageRoleId!:number;

    @ApiProperty({type: 'varchar', name: 'language_name', nullable: false})
    @IsNotEmpty()
    languageName!:string;

}
