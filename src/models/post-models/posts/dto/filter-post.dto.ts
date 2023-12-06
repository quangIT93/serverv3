import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';
import { IsGreaterThan } from 'src/common/decorators/validation/isGreaterThan.validator';
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
  sort_by!: SORT_BY;

  @ApiProperty({
    type: 'string',
    format: 'enum',
    required: false,
    enum: ['1', '2'],
    default: '1',
    description: 'money_type must be 1 | 2 ',
  })
  @IsOptional()
  @OneOfOptionalRequired(['1', '2'])
  money_type!: string;

  @ApiProperty({
    type: 'double',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  salary_min!: number;

  @ApiProperty({
    type: 'double',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsGreaterThan('salary_min', {
    message: 'Salary max must be larger than salary min',
  })
  salary_max!: number;
}
