import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class createSearchSuggestDto {
    
    @IsString()
    @IsNotEmpty()
    keyword?: string;

    @IsNumber()
    @IsOptional()
    status?: number = 1;

    @IsNumber()
    order?: number = 0;
    
}