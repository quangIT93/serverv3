import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";


export class GetHotTopicDto {

    @ApiProperty({ required: false, enum: ['app', 'web'] })
    @IsEnum(['app', 'web'])
    version?: string = 'app';

}