import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateCompanyDescriptionTemplateDto {
  @ApiProperty({
    type: 'string',
    format: 'string',
    nullable: false,
    maxLength: 525,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(525, {
    message: 'content length must not exceed 525 characters',
  })
  title!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    maxLength: 3000,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000, {
    message: 'content length must not exceed 3000 characters',
  })
  content!: string;

  @ApiProperty({ type: 'number', required: true, nullable: false })
  @IsNumber()
  @Min(0)
  parentCategoryId!: number;
}
