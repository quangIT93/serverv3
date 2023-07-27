import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateSearchSuggestDto {
    
    @IsString()
    @IsNotEmpty()
    keyword!: string;

    @IsNumber()
    @IsOptional()
    status!: number;

    @IsNumber()
    order!: number;
    
}