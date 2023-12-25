import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryCompanyViewDto {
  @ApiProperty({ type: 'int', required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  page!: number;

  @ApiProperty({ type: 'int', required: false, default: 20 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit!: number;
}
