import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesReferenceDto {

    accountId!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsNotEmpty()
    fullName!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsNotEmpty()
    phone!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsNotEmpty()
    email!:string;


    @ApiProperty({type: 'string', format: 'string', required: true})
    @IsNotEmpty()
    description!:string;
}
