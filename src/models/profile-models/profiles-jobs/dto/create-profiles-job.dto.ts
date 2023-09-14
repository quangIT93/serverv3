import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesJobDto {

    accountId!: string;

    @ApiProperty({ type: 'number' })
    @IsNotEmpty()
    jobTypeId!: number;
}
