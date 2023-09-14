import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfilesJobDto } from './create-profiles-job.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProfilesJobDto extends PartialType(CreateProfilesJobDto) {

    @ApiProperty({ type: "array", items: { type: "number" } })
    @IsNumber({}, { each: true })
    @IsOptional()
    ids!: number[];
}
