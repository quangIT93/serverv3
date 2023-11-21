import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterCompaniesDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'District id',
  })
  @IsOptional()
  addresses?: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'Parent categories id',
  })
  @IsOptional()
  categories?: number[];

  @ApiProperty({ type: 'int', required: false })
  @IsOptional()
  companySizeId?: number;

  @ApiProperty({ type: 'int', required: false, default: 20 })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    type: 'int',
    required: false,
    default: 1,
    description: 'Status company must be 0 || 1',
  })
  @IsOptional()
  status?: number;

  @ApiProperty({ type: 'int', required: false, default: 0 })
  @IsOptional()
  page?: number;

  accountId?: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
    description: 'Array account id',
  })
  @IsOptional()
  accountIds?: string[];
}
