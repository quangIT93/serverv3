import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesCvDto {

    accountId!:string;

    image!:string;

    @ApiProperty({type: 'varchar', maxLength: 255, nullable: false, default: 'HiJob CV'})
    @IsNotEmpty()
    name!:string;

    @ApiProperty({type: 'number', nullable: false, default: 1})
    @IsNotEmpty()
    status!: number;

    @ApiProperty({type: 'file', nullable: false})
    file!: any
}
