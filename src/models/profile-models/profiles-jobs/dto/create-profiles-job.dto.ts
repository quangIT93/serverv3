import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesJobDto {

    accountId!: string;

    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    jobTypeId!: number[];
}
