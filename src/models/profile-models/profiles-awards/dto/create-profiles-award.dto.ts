import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesAwardDto {

    accountId!: string;

    @ApiProperty({type: 'varchar', maxLength: 255, name: 'title', nullable: false})
    @IsNotEmpty()
    title!: string;

    @ApiProperty({type: 'varchar', maxLength: 1000, name: 'description', nullable: false})
    @IsNotEmpty()
    description!: string;
}
