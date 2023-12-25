import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PagingDto {
  @ApiProperty({ type: 'number', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  page!: number;

  @ApiProperty({ type: 'number', default: 20 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit!: number;
}
