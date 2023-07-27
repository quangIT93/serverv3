import { PartialType } from "@nestjs/swagger";
import { CreateSearchSuggestDto } from "./create-search.dto";

export class UpdateSearchDto extends PartialType(CreateSearchSuggestDto){
    constructor() 
    { 
        super(); 
    }
}