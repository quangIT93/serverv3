import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class UpdateSearchDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    keyword?: string;

    @IsNumber()
    @IsNotEmpty()
    order?:number;
}