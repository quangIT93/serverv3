import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
// import { IsNumber } from 'class-validator';

export class FilterCandidatesDto {
  @ApiProperty({ type: 'array', items: { type: 'number' }, required: false })
  @IsOptional()
  addresses!: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' }, required: false })
  @IsOptional()
  categories!: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' }, required: false })
  @IsOptional()
  educations!: number[];

  @ApiProperty({ type: 'int', required: false })
  @IsOptional()
  gender!: number;

  @ApiProperty({ type: 'int', required: false })
  @IsOptional()
  ageMin!: number;

  @ApiProperty({ type: 'int', required: false })
  @IsOptional()
  ageMax!: number;
}
