import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLevelTypeDto {

    @ApiProperty({ type: 'varchar', description: 'value'})
    @IsNotEmpty()
    value!: string;

    @ApiProperty({ type: 'varchar', description: 'value_en'})
    @IsNotEmpty()
    valueEn!: string;

    @ApiProperty({ type: 'varchar', description: 'value_ko'})
    @IsNotEmpty()
    valueKo!: string;
}
