import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty()
  @OneOfOptionalRequired([0, 1])
  status!: StatusCompany;
}
