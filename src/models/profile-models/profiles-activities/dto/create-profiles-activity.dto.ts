import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfilesActivityDto {
  accountId!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: false,
    maxLength: 255,
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: false,
    maxLength: 255,
  })
  @IsNotEmpty()
  employer!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: false,
    maxLength: 1000,
  })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  endDate!: string;
}
