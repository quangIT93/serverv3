import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsNotEmpty, IsString } from "class-validator";

export class UpdateKeywordNotificationDto {

    @IsNotEmpty()
    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({message: 'keyword must be a string'})
    keyword!: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: true })
    @ArrayMaxSize(10, { message: 'categoriesId cannot have more than 10 items' })
    categoriesId!: number[];

    @IsNotEmpty()
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'string' }, required: true })
    @ArrayMaxSize(10, { message: 'districtsId cannot have more than 10 items' })
    districtsId!: string[];
}
