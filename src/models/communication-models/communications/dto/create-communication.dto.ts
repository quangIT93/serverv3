import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateCommunicationDto {

    @IsOptional()
    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', maxLength: 500, required: true, default: 'Test' })
    @IsNotEmpty()
    @MaxLength(500, { message: 'title length must not exceed 500 characters' })
    title!: string;

    @ApiProperty({ type: 'string', format: 'string', maxLength: 1000, required: true, default: 'Test' })
    @IsNotEmpty()
    @MaxLength(1000, { message: 'title length must not exceed 1000 characters' })
    content!: string;

    // @ApiProperty({type: 'number',format: 'number', required: true, default: 1})
    // @IsOptional()
    // status!:number;

    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: false })
    @IsOptional()
    images!: any;

    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: false })
    @MaxLength(2, { message: 'categoryId length must not exceed 5' })
    @IsOptional()
    categoryId!: number[];
}
