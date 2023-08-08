import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCommunicationDto {

    @IsOptional()
    accountId!:string;

    @ApiProperty({type: 'string',format: 'string', required: true, default: 'Test'})
    @IsNotEmpty()
    title!:string;

    @ApiProperty({type: 'string',format: 'string', required: true, default: 'Test'})
    @IsNotEmpty()
    content!:string;

    @ApiProperty({type: 'number',format: 'number', required: true, default: 1})
    @IsOptional()
    status!:number;

    @IsOptional()
    images!: string[] | undefined;

    @IsOptional()
    categoryId!:number[] | undefined;
}
