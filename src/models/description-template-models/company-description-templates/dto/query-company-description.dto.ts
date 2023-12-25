import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryCompanyDescriptionDto {
  @ApiProperty({ type: 'int', required: false })
  @IsOptional()
  parentCategoryId!: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  title!: string;

  @ApiProperty({ type: 'int', required: false, default: 20 })
  @IsOptional()
  limit!: number;

  @ApiProperty({ type: 'int', required: false, default: 0 })
  @IsOptional()
  page!: number;
}
