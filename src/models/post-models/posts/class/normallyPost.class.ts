// import { MoneyType } from "src/common/enum";
// import { ResponseSalaryTypeDto } from "src/models/salary-types/dto/response-salary-type.dto";

export class PostNormally {
    id!: number;
    title!: string;
    accountId!: string;
    companyName!: string;
    address!: string;
    salaryMin!: number;
    salaryMax!: number;
    // salary!: ResponseSalaryTypeDto;
    thumbnail!: string;
    createdAtText!: string;
    // moneyType!: MoneyType;

    [key: string]: any;
}