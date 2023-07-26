// import { PartialType } from '@nestjs/swagger';
// import { CreateParentDto } from './create-parent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ChildCategory } from '../../children/entities/child.entity';

export class UpdateParentDto{

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    // @IsOptional()
    // @IsString()
    // image?: string;

    // @IsOptional()
    // @IsString()
    // defaultPostImage?: string;
    
    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsOptional()
    @MaxLength(255)
    @IsString()
    nameEn?: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsOptional()
    @MaxLength(255)
    @IsString()
    nameKor?: string;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    status?: number;


    @IsOptional()
    childCategories?: ChildCategory[] | undefined;
}
