import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';
import { IsGreaterOrEqualThan } from 'src/common/decorators/validation/isGreaterThan.validator';
import { SORT_BY } from 'src/common/enum/sort.enum';

export class FilterPostDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  provinceId!: string;

  @ApiProperty({
    type: 'string',
    format: 'enum',
    required: false,
    enum: ['DESC', 'ASC'],
    description: 'sort_by must be DESC | ASC',
  })
  @IsOptional()
  @OneOfOptionalRequired(['DESC', 'ASC'])
  sortBy!: SORT_BY;

  @ApiProperty({
    type: 'string',
    format: 'enum',
    required: false,
    enum: ['1', '2'],
    default: '1',
    description: 'moneyType must be 1 - VND | 2 - USD ',
  })
  @IsOptional()
  @OneOfOptionalRequired(['1', '2'])
  moneyType!: string;

  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Salary min must be a number greater than or equal 0' })
  salaryMin!: number;

  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsGreaterOrEqualThan('salaryMin', {
    message: 'Salary max must be larger than salary min',
  })
  @Min(0, { message: 'Salary min must be a number greater than or equal 0' })
  salaryMax!: number;

  @IsOptional()
  a!: number;
}
