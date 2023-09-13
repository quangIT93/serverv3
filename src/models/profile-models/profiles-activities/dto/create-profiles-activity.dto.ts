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
  oganization!: string;

  @ApiProperty({
    type: 'text',
    format: 'string',
    required: false,
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
