import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';

export class CreateProfilesIntershipDto {
  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  jobTitle!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  employer!: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNotEmpty()
  description!: string;

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
