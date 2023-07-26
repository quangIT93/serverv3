import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateChildDto {

    @IsNotEmpty()
    @IsNumber()
    parentCategoryId?: number;

    @IsString()
    @MaxLength(255)
    name?: string;

    @IsString()
    @MaxLength(255)
    nameEn?: string

    @IsString()
    @MaxLength(255)
    nameKor?: string

    @IsNumber()
    @IsOptional()
    status?: number = 1;
}
