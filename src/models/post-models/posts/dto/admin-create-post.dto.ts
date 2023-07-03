import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { IsTimestamp, OneOfOptionalRequired } from 'src/common/decorators/validation';
// import { IsFile } from "src/common/decorators/validation";

export class CreatePostByAdminDto {
    accountId!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @MaxLength(100)
    title!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @MaxLength(100)
    companyName!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: '00001',
    })
    @IsString()
    wardId!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: '79 Quoc Huong',
    })
    @IsString()
    @MaxLength(255)
    address!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsEmail()
    email?: string | null = null;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsPhoneNumber('VN')
    phone?: string | null = null;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString()
    @MaxLength(4000)
    description!: string;

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isDatePeriod!: number; // only 0 or 1

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isWorkingWeekend!: number;

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isRemotely!: number;

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsOptional()
    @IsTimestamp()
    startDate?: number | null = null;

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsOptional()
    @IsTimestamp()
    endDate?: number | null = null;

    @ApiProperty({
        type: 'string',
        format: 'number',
        required: true,
        default: 57600000,
    })
    @IsTimestamp()
    startTime!: number;

    @ApiProperty({
        type: 'string',
        format: 'number',
        required: true,
        default: 57600000,
    })
    @IsTimestamp()
    endTime!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true, default: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    salaryMin!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true, default: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    salaryMax!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2, 3, 4, 5, 6],
        description:
            '1: Giờ, 2: Ngày, 3: Tuần, 4: Tháng, 5: Công Việc, 6: Thương Lượng',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2, 3, 4, 5, 6])
    salaryType!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2],
        description: '1: VND, 2: USD',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2])
    moneyType!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2, 4, 7],
        description: '1: Full',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2, 4, 7])
    jobTypeId!: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsDate()
    expiredDate!: Date | null;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    // @IsOptional()
    @IsString()
    siteUrl!: string;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    companyResourceId!: number;

    @ApiProperty({
        type: 'file',
        format: 'binary',
        required: false,
        isArray: true,
    })
    @IsOptional()
    images?: string[] | [];


    validate() {
        if (this.isDatePeriod === 1) {
            if (!this.startDate || !this.endDate) {
                throw new Error('Start date and end date are required');
            }
        }
        

    }
        
}
