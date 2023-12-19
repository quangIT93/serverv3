import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDescriptionTemplateDto {
  @ApiProperty({
    type: 'string',
    format: 'string',
    nullable: false,
    maxLength: 525,
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
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000, {
    message: 'content length must not exceed 3000 characters',
  })
  content!: string;

  @ApiProperty({ type: 'number', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  childCategoryId!: number;
}
