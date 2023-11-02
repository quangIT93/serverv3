import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';

export class UpdateCompanyRatingDto {
  @ApiProperty({ type: 'number', nullable: true })
  @IsOptional()
  @IsNumber()
  companyId!: number;

  accountId!: string;

  @ApiProperty({
    type: 'number',
    format: 'enum',
    required: true,
    enum: [1, 2, 3, 4, 5],
    description: 'Star must be 1 to 5',
    nullable: true,
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @OneOfOptionalRequired([1, 2, 3, 4, 5])
  star!: number;

  @ApiProperty({
    type: 'string',
    format: 'string',
    maxLength: 3000,
    nullable: true,
  })
  @IsOptional()
  @MaxLength(10000, {
    message: 'content length must not exceed 10000 characters',
  })
  comment!: string;
}
