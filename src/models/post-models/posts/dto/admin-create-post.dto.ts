import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, Min } from "class-validator";
import { OneOfOptionalRequired } from "src/common/decorators/validation";
import { IsFile } from "src/common/decorators/validation";

export class CreatePostByAdminDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    accountId!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    @MaxLength(100)
    title!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    @MaxLength(100)
    companyName!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    wardId!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    @MaxLength(255)
    address!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsEmail()
    email?: string | null = null;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsPhoneNumber('VN')
    phone?: string | null = null;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsString()
    @MaxLength(4000)
    description!: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isDatePeriod!: number; // only 0 or 1

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isWorkingWeekend!: number;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isRemotely!: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsDate({ each: true })
    startDate?: Date | null = null;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsDate({ each: true })
    endDate?: Date | null = null;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsDate({ each: true })
    startTime!: Date;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsDate({ each: true })
    endTime!: Date;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false})
    @Min(0)
    salaryMin!: number;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false})
    @Min(0)
    salaryMax!: number;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false})
    salaryType!: number;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false})
    @OneOfOptionalRequired([1, 2])
    moneyType!: number;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false})
    jobTypeId!: number;
    
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsDate()
    expiredDate!: Date | null;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsString()
    siteUrl!: string | null;

    @ApiProperty({ type: 'file', format: 'binary', required: false, isArray: true })
    @IsOptional()
    @IsFile({ mime: ['image/jpg', 'image/png', 'image/jpeg'] })
    image!: any | null;
}