import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunicationLikeDto {
  @ApiProperty({
    type: 'number',
    format: 'number',
    required: true,
    default: 'Test',
  })
  @IsNotEmpty()
  communicationId!: number;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: true,
    default: 'Test',
  })
  accountId!: string;
}
