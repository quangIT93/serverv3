import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
// import { IsNumber } from 'class-validator';

export class FilterCandidatesDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    default: [79, 1],
  })
  @IsOptional()
  addresses!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    default: [254, 353],
  })
  @IsOptional()
  categories!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    default: [8],
  })
  @IsOptional()
  educations!: number[];

  @ApiProperty({ type: 'int', required: false, default: 1 })
  @IsOptional()
  gender!: number;

  @ApiProperty({ type: 'int', required: false, default: 18 })
  @IsOptional()
  ageMin!: number;

  @ApiProperty({ type: 'int', required: false, default: 50 })
  @IsOptional()
  ageMax!: number;

  @ApiProperty({ type: 'int', required: false, default: 20 })
  @IsOptional()
  limit!: number;

  @ApiProperty({ type: 'int', required: false, default: 0 })
  @IsOptional()
  page!: number;
}
