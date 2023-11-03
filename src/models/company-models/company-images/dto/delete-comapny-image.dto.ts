import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { IsDecimal, IsOptional } from "class-validator";

export class UpdateCompanyImageDto {
    @Transform(({ value }) => {
        if (Array.isArray(value)) return value;
        return value.split(',').map((item: number) => item);
    })
    @ApiProperty({ type: 'array', items: { type: 'number' }, required: false })
    // @IsArray({ message: 'Id must be an array of number'})
    @IsDecimal({}, { each: true, message: 'Id must be an array of number' })
    @IsOptional()
    imagesId!: number[];

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
    @IsOptional()
    images!: File[] | undefined;

}
