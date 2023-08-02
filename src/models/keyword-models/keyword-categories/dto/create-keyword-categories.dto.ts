import { IsNotEmpty } from "class-validator";
import { IsArrayNumberOrNumber } from "src/common/decorators/validation/isArrayNumberOrNumber.validator";


export class CreateKeywordCategoriesDto {

    @IsNotEmpty()
    keywordId!: number 

    @IsArrayNumberOrNumber()
    @IsNotEmpty()
    categoryId!: number[] 
}