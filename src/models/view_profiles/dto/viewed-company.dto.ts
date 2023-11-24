import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, Min, Max } from "class-validator";

export class ViewedCompanyDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  page!: number;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  limit!: number;
}
