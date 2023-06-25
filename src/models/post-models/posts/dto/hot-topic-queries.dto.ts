import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {  IsOptional, IsString, } from 'class-validator';
import { QUERY_CHILDREN_CATEGORY_ID, QUERY_IS_REMOTELY, QUERY_IS_SHORT_TIME_JOBS, QUERY_PARENT_CATEGORY_ID } from 'src/common/constants';
export class HotTopicQueriesDto {

    // Not required
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    [QUERY_CHILDREN_CATEGORY_ID]?: string;
    
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    [QUERY_PARENT_CATEGORY_ID]?: string;
    
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    [QUERY_IS_REMOTELY]?: string;

    @ApiProperty({ type: String, required: false })
    // @IsNumberString()
    @IsOptional()
    [QUERY_IS_SHORT_TIME_JOBS]?: number;
    

    [key: string]: any;


    constructor(partial: Partial<HotTopicQueriesDto>) {
        Object.assign(this, partial);
    }

    static from(plain: string) {
        // const temp = plain.split('&');
        // const queries: {[key: string]: string} = {
            
        // };
        // temp.forEach((item) => {
        //     const [key, value] = item.split('=') 
        //     queries[key] = value;
        // });

        return plainToClass(HotTopicQueriesDto, plain);

    }
}