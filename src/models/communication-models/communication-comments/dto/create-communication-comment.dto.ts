import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateCommunicationCommentDto {
  @ApiProperty({ type: 'number', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  communicationId!: number;

  @ApiProperty({ type: 'varchar', maxLength: 50, nullable: false })
  accountId!: string;

  @ApiProperty({ type: 'varchar', maxLength: 500, nullable: false })
  @IsNotEmpty()
  @MaxLength(500, { message: 'content length must not exceed 500 characters' })
  content!: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'file', format: 'binary' },
    required: false,
  })
  @IsOptional()
  images!: string[] | undefined;
}
