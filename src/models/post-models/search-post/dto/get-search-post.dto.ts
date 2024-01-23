import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, Validate } from 'class-validator';

export class GetSearchPostDto {
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'query',
  })
  @IsOptional()
  q!: string;

  @ApiProperty({ type: 'number', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  page!: number;

  @ApiProperty({ type: 'number', default: 20 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  limit!: number;

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'District id',
  })
  @IsOptional()
  districtId!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'Provinces id',
  })
  @IsOptional()
  provinceIds!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'Child categories id',
  })
  @IsOptional()
  categories!: number[];

  @ApiProperty({
    type: 'enum',
    required: false,
    description: 'Is working weekends (0 - No, 1 - Yes)',
    enum: ['0,', '1'],
  })
  @IsOptional()
  is_working_weekend!: number;

  @ApiProperty({
    type: 'enum',
    enum: ['0', '1'],
    required: false,
    description: 'Is remotely (0 - No, 1 - Yes)',
  })
  @IsOptional()
  is_remotely!: string;

  @ApiProperty({
    type: 'int',
    required: false,
    description: 'Salary Min',
    default: 0,
  })
  @IsOptional()
  salary_min!: number;

  @ApiProperty({
    type: 'int',
    required: false,
    description: 'Salary Max',
    default: 12000000,
  })
  @IsOptional()
  salary_max!: number;

  @ApiProperty({
    type: 'int',
    required: false,
    description:
      'Salary type (1 - Hourly, 2 - Daily, 3 - Weekly, 4 - Monthly, 5 - Job, 6 - Negotiate)',
  })
  @IsOptional()
  @Validate((value: number) => {
    const validValues = [1, 2, 3, 4, 5, 6];
    if (!validValues.includes(value)) {
      return {
        message: 'Invalid salary_type value. Must be one of: 1, 2, 3, 4, 5, 6.',
      };
    }
    return true;
  })
  salary_type!: number;

  @ApiProperty({
    type: 'int',
    required: false,
    description:
      'Job type (1 - Fulltime, 2 - Partime, 4 - Freelancer, 7 - Intern)',
  })
  @IsOptional()
  @Validate((value: number) => {
    const validValues = [1, 2, 4, 7];
    if (!validValues.includes(value)) {
      return {
        message: 'Invalid jobTypeId value. Must be one of: 1, 2, 4, 7.',
      };
    }
    return true;
  })
  jobTypeId!: number;

  @ApiProperty({
    type: 'enum',
    required: false,
    description: 'Money type (1 - VND, 2 - USD)',
    enum: ['1', '2'],
  })
  @IsOptional()
  money_type!: string;
}
