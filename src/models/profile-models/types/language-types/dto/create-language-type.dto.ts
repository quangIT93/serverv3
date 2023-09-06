import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLanguageTypeDto {
    
    @ApiProperty({ type: 'varchar', description: 'value'})
    @IsNotEmpty()
    value!: string;

    @ApiProperty({ type: 'varchar', description: 'value'})
    @IsNotEmpty()
    valueEn!: string;

    @ApiProperty({ type: 'varchar', description: 'value'})
    @IsNotEmpty()
    valueKo!: string;
}
