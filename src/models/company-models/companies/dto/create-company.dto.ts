import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
// import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateCompanyDto {
    @IsOptional()
    accountId: string | undefined = undefined;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Name must be a string' })
    name!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Address must be a string' })
    @MaxLength(255, { message: 'Address must be less than 255 characters' })
    address!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Ward_id detail must be a string' })
    @MaxLength(20, { message: 'Ward_id detail must be less than 20 characters' })
    wardId!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @IsString({ message: 'Tax code must be a string' })
    @MaxLength(255, { message: 'Tax code must be less than 255 characters' })
    taxCode!: string | null;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Phone must be a string' })
    @MaxLength(20, { message: 'Phone must be less than 20 characters' })
    phone!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    @MaxLength(255, { message: 'Email must be less than 255 characters' })
    email!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Website must be a string' })
    @MaxLength(255, { message: 'Website must be less than 255 characters' })
    @IsUrl({}, { message: 'Website must be a valid url' })
    @IsOptional()
    website!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({ message: 'Description must be a string' })
    @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
    description!: string;

    @ApiProperty({ type: 'number', format: 'string', required: true })
    @IsNumber({}, { message: 'company_role_id must be a number' })
    companyRoleId!: number;

    @ApiProperty({ type: 'number', format: 'string', required: true })
    @IsNumber({}, { message: 'company_size_id must be a number' })
    companySizeId!: number;

    @ApiProperty({ type: 'number', format: 'string', required: true })
    @IsNumber({}, { message: 'category_id must be a number' })
    categoryId!: number;

    @ApiProperty({ type: 'number', format: 'binary', required: true })
    @Transform(({ value } : { value: Express.Multer.File}) => value.originalname)
    @IsOptional()
    logo!: string;

    [key: string]: any;
}
