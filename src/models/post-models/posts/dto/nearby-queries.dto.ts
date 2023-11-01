import {
    QUERY_CHILDREN_CATEGORY_ID,
    QUERY_PARENT_CATEGORY_ID,
    QUERY_PROVINCES,
} from 'src/common/constants/postQuery.constants';
import { Type, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { } from 'src/common/constants';
export class NearByQueriesDto {
    // Not required
    @ApiProperty({ type: 'array', required: false, items: { type: 'number' } })
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @IsOptional()
    [QUERY_CHILDREN_CATEGORY_ID]?: number[];

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    [QUERY_PARENT_CATEGORY_ID]?: number;

    @ApiProperty({ type: 'array', required: true, items: { type: 'number' } })
    @IsNumberString({}, { each: true })
    
    // @Transform(({ value }) => isArray(value) ? value.map(Number) : Number(value))
    [QUERY_PROVINCES]!: string[];

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    limit?: number;

    [key: string]: any;

    constructor(partial: Partial<NearByQueriesDto>) {
        Object.assign(this, partial);
    }

    static from(plain: string) {
        return plainToClass(NearByQueriesDto, plain);
    }
}
