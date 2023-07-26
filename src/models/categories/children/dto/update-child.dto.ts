// import { PartialType } from '@nestjs/swagger';
// import { CreateChildDto } from './create-child.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateChildDto {

    @IsNotEmpty()
    id?: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?:string;

    @IsNotEmpty()
    parentCategoryId?: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    nameEn?:string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    nameKor?:string;

    @IsOptional()
    status?:number = 1;
}
