import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLevelTypeDto {

    @ApiProperty({ type: 'string', format: 'string', required: false})
    @IsNotEmpty()
    value!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false})
    @IsNotEmpty()
    valueEn!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false})
    @IsNotEmpty()
    valueKo!: string;
}
