import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesReferenceDto {

    accountId!:string;

    @ApiProperty({ type: 'varchar', description: 'Full name of the profile reference', required: true, maxLength: 255})
    @IsNotEmpty()
    fullName!:string;

    @ApiProperty({ type: 'varchar', description: 'Company name of the profile reference', required: true, maxLength: 255})
    @IsNotEmpty()
    companyName!:string;

    @ApiProperty({ type: 'varchar', description: 'Phone number of the profile reference', required: true, maxLength: 255})
    @IsNotEmpty()
    phone!:string;

    @ApiProperty({ type: 'varchar', description: 'Email of the profile reference', required: true, maxLength: 255})
    @IsNotEmpty()
    email!:string;
}
