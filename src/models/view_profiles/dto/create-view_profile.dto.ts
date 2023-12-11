import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateViewProfileDto {

    recruitId!:string;

    @ApiProperty({
        type: 'string', 
        nullable: false, 
        description: 'id of candidate', 
        maxLength: 50, 
        default: 'string'
    })
    @IsNotEmpty()
    profileId!:string;
}
