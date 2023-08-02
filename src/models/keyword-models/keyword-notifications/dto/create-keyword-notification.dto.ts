import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateKeywordNotificationDto {

    @IsNotEmpty()
    accoundId!: string;

    @IsNotEmpty()
    keyword!: string;

    @IsNotEmpty()
    @IsArray()
    categoriesId!: number[];

    @IsNotEmpty()
    districtsId!: string[];

    @IsOptional()
    districtId?: string;

    @IsOptional()
    categoryId?: number;
}
