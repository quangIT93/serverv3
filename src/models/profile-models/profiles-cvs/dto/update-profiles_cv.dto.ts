import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfilesCvDto } from './create-profiles_cv.dto';
import { IsOptional } from 'class-validator';

export class UpdateProfilesCvDto extends PartialType(CreateProfilesCvDto) {
  id!: number;

  @ApiProperty({type: 'number', nullable: false, default: 0})
  @IsOptional()
  status!: number;
}
