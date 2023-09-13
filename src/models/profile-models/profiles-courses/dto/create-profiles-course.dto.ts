import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';

export class CreateProfilesCourseDto {

  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  courseName!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  insitiutionName!: string;

  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  startDate!: string;

  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  endDate!: string;
}
