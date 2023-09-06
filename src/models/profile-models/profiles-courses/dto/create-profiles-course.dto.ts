import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfilesCourseDto {

  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  courseName!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  insitiutionName!: string;

  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  endDate!: string;
}
