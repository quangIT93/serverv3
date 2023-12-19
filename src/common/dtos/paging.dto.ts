import { IsNumber, IsOptional, Min } from 'class-validator';

export class PagingDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  page!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit!: number;
}
