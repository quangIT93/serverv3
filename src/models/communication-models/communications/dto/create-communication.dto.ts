import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCommunicationDto {

    @IsOptional()
    @ApiProperty({type: 'string',format: 'string', required: true, default: 'Test'})
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

    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: false })
    @IsOptional()
    images!: string[] | undefined;

    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: false })
    @IsOptional()
    categoryId!:number[] | undefined;
}
