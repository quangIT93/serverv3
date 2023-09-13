import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesAwardDto {

    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsNotEmpty()
    description!: string;
}
