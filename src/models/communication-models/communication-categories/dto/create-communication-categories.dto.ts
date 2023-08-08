import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommunicationCategoriesDto {

    @ApiProperty({type: 'number',format: 'number', required: true})
    @IsNotEmpty()
    communicationId!:number;
    
    @ApiProperty({type: 'number',format: 'number', required: true})
    @IsNotEmpty()
    categoryId!:number;
}
