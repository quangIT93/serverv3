import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostMediaDto {
  companyId!: number;

  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  postId!: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  linkTiktok!: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  linkYoutube!: string;

  @ApiProperty({
    type: 'file',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  @IsString()
  image!: string;

  // @ApiProperty({ type: 'file', format: 'binary', required: false })
  // @IsOptional()
  // video!: string;

  status!: number;
}
