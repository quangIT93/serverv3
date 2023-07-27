import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreateSearchSuggestDto {
    
    @IsString()
    @IsOptional()
    keyword!: string;

    @IsNumber()
    @IsOptional()
    status!: number;

    @IsNumber()
    @IsOptional()
    order!: number;
    
}