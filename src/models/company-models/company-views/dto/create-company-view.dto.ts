export class CreateCompanyViewDto {
    companyId!: number;
    accountId!: string;

    constructor(companyId: number, accountId: string) {
        this.companyId = companyId;
        this.accountId = accountId;
    }
}
