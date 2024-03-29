import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';

export class UpdateCompanyRatingByUserDto {
  companyId!: number;

  accountId!: string;

  @ApiProperty({
    type: 'number',
    format: 'enum',
    required: true,
    enum: [1, 2, 3, 4, 5],
    description: 'Star must be 1 to 5',
  })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @OneOfOptionalRequired([1, 2, 3, 4, 5])
  star!: number;

  @ApiProperty({
    type: 'string',
    format: 'string',
    maxLength: 3000,
  })
  @IsNotEmpty()
  @MaxLength(3000, {
    message: 'content length must not exceed 3000 characters',
  })
  comment!: string;
}
