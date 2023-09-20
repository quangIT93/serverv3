import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfilesCvDto {
  accountId!: string;

  image!: string;

  imageBuffer!: Buffer;

  path!: string;

  @ApiProperty({
    type: 'varchar',
    maxLength: 255,
    nullable: false,
    default: 'HiJob CV',
  })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: 'file', nullable: false })
  file!: any;
}
