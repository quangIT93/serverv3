import { IsNotEmpty } from "class-validator";

export class UpdateKeywordNotificationDto {
    @IsNotEmpty()
    keyword!: string;

    @IsNotEmpty()
    categoriesId!: number[];

    @IsNotEmpty()
    districtsId!: string[];
}
