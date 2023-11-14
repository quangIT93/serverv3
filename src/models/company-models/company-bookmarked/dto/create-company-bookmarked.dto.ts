import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyBookmarkedDto {
  accountId!: string;

  @ApiProperty({
    type: 'number',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  companyId!: number;
}
