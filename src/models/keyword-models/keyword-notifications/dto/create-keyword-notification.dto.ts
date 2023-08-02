import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateKeywordNotificationDto {

    @IsOptional()
    accoundId!: string;

    @ApiProperty({ type: 'string', format: 'string' })
    @IsNotEmpty()
    keyword!: string;

    @ApiProperty({ type: 'array', items: { type: 'number' } })
    @IsNotEmpty()
    @IsArray()
    categoriesId!: number[];

    @ApiProperty({ type: 'array', items: { type: 'string' } })
    @IsNotEmpty()
    districtsId!: string[];

    @IsOptional()
    districtId?: string;

    @IsOptional()
    categoryId?: number;
}
