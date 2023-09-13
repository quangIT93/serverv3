import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesReferenceDto {

    accountId!:string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    fullName!:string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    phone!:string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    email!:string;
}
