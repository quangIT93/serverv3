import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
    // ArrayMaxSize,
    // ArrayMinSize,
    // ArrayUnique,
    // IsArray,
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { OneOfOptionalRequired, IsTimestamp } from 'src/common/decorators/validation';
import { Post } from '../entities';
import { IsArrayNumberOrNumber } from 'src/common/decorators/validation/isArrayNumberOrNumber.validator';
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
    email: string | null = null;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsPhoneNumber('VN')
    phone: string | null = null;

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
    startDate: number | null = null;

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsOptional()
    @IsTimestamp()
    endDate: number | null = null;

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

    @ApiProperty({
        type: 'array',
        format: 'number',
        required: true,
        default: [400],
        description: '400: Nhân viên',
    })
    @IsArrayNumberOrNumber({ maxLength: 2, minLength: 1 })
    categoriesId!: number[] | number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    @IsTimestamp()
    expiredDate!: Date | null;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    // @IsOptional()
    @IsString()
    siteUrl!: string;

    @ApiProperty({ type: 'number', format: 'binary', required: true, default: 0 })
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




    validate(): any {
        if (this.isDatePeriod === 1) {
            if (!this.startDate || !this.endDate) {
                return new BadRequestException('Start date and end date are required when isDatePeriod is true');
            }
        }

        return true
        
    }

    // add account id and images to dto
    addData(accountId: string): void {
        this.accountId = accountId;
        
        // if (images) {
        //     this.images = [images.thumbnail.originalname, ...images.original.map((image) => image.originalname)]
        // }
    }

    // serialization():   {
    // }

    toEntity(): Post {
        const post = new Post();
        post.accountId = this.accountId;
        post.title = this.title;
        post.companyName = this.companyName;
        post.wardId = this.wardId;
        post.address = this.address;
        post.email = this.email;
        post.phoneContact = this.phone;
        post.description = this.description;
        post.isDatePeriod = this.isDatePeriod;
        post.isWorkingWeekend = this.isWorkingWeekend;
        post.isRemotely = this.isRemotely.toString();
        post.startDate = this.startDate?.toString() || null;
        post.endDate = this.endDate?.toString() || null;
        post.startTime = this.startTime.toString();
        post.endTime = this.endTime.toString();
        post.salaryMin = this.salaryMin;
        post.salaryMax = this.salaryMax;
        post.salaryType = this.salaryType;
        post.moneyType = this.moneyType.toString();
        post.jobType = this.jobTypeId;
        post.expiredDate = this.expiredDate ? new Date(+this.expiredDate) : null;
        post.isInHouseData = '1';
        post.status = 1;
        // post.images = this.images;

        return post;
    }
        
}
