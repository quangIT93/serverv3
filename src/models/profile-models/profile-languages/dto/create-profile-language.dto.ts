import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfileLanguageDto {
    
    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    languageLevelId!:number;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    languageName!:string;

}
