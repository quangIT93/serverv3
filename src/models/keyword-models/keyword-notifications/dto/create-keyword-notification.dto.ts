import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateKeywordNotificationDto {

    @IsNotEmpty()
    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({message: 'accoundId must be a string'})
    accoundId!: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({message: 'keyword must be a string'})
    keyword!: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(10, { message: 'categoriesId cannot have more than 10 items' })
    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: true })
    categoriesId!: number[];

    @IsNotEmpty()
    @ArrayMaxSize(10, { message: 'districtsId cannot have more than 10 items' })
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'string' }, required: true })
    districtsId!: string[];

    @IsOptional()
    @IsString({message: 'districtId must be a string'})
    districtId?: string;

    @IsOptional()
    @IsString({message: 'categoryId must be a string'})
    categoryId?: number;
}
