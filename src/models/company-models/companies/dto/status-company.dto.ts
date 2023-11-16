import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';
import { StatusCompany } from 'src/common/enum';

export class StatusCompanyDto {
  @ApiProperty({
    type: 'number',
    format: 'enum',
    required: true,
    description: 'Status must be 0 || 1',
  })
  @IsNumber({}, { message: 'status must be a number' })
  @OneOfOptionalRequired([0, 1])
  status!: StatusCompany;
}
