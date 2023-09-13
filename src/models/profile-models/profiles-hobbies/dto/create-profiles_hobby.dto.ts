import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesHobbyDto {

    accountId!: string;

    @ApiProperty({type: 'varchar', maxLength: 1000, nullable : false})
    @IsNotEmpty()
    description!: string;
}
