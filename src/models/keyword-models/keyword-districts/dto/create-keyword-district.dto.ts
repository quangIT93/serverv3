import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateKeywordDistrictDto {

    @IsNotEmpty()
    @ApiProperty({ type: 'number', format: 'number', required: true })
    keywordId!: number;

    @IsNotEmpty()
    districtId!: string[];
}