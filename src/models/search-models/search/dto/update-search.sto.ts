import { PartialType } from "@nestjs/swagger";
import { CreateSearchSuggestDto } from "./create-search.dto";

export class UpdateSearchSuggestDto extends PartialType(CreateSearchSuggestDto) {
    constructor() {
        super();
    }
}