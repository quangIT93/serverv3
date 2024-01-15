import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';

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

  @ApiProperty({
    type: 'number',
    format: 'enum',
    required: true,
    enum: [1, 2],
    description: '1: success, 2: block',
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @OneOfOptionalRequired([1, 2])
  status!: number;
}
