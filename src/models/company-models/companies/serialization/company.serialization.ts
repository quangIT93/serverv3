import { Exclude, Expose, Transform } from "class-transformer";
import { Company } from "../entities/company.entity";
import { BUCKET_IMAGE_COMANIES_LOGO } from "src/common/constants";
import { CompanyRoleSerialization } from "../../company-roles/serialization/company-role.serializarion";
import { Language } from "src/common/enum";
import { categoryTranslator, locationTranslator } from "src/common/helper/translators";
import { CompanySizeSerialization } from "../../company-sizes/serialization/company-size.serialization";

export class CompanySerialization extends Company {
    lang: Language = Language.VI;

    constructor(company: Company, lang: Language) {
        super();
        this.lang = lang;
        Object.assign(this, company);
    }

    @Exclude({ toPlainOnly: true })
    override logo!: string;

    @Exclude({ toPlainOnly: true })
    override wardId!: string;

    @Exclude({ toPlainOnly: true })
    override companyRoleId!: number;

    @Exclude({ toPlainOnly: true })
    override companySizeId!: number;

    @Exclude({ toPlainOnly: true })
    override categoryId!: number;

    @Exclude({ toPlainOnly: true })
    override companyRole!: any;

    @Exclude({ toPlainOnly: true })
    override companySize!: any;

    @Exclude({ toPlainOnly: true })
    override category!: any;

    @Exclude({ toPlainOnly: true })
    override ward!: any;

    @Transform(({ value }) => new Date(value).getTime())
    override createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    override updatedAt!: Date;

    @Expose()
    get logoPath() {
        if (!this.logo) return null;
        return `${BUCKET_IMAGE_COMANIES_LOGO}/${this.id}/${this.logo}`;
    }

    @Expose()
    get companyRoleInfomation() {
        if (!this.companyRole) return null;
        return Object.assign(new CompanyRoleSerialization(this.companyRole, this.lang));
    }

    @Expose()
    get companyLocation() {
        if (!this.ward) return null;
        return locationTranslator(this.ward, this.lang);
    }

    @Expose()
    get companyCategory() {
        if (!this.companySize) return null;
        return categoryTranslator(this.category, this.lang);
    }

    @Expose()
    get companySizeInfomation() {
        if (!this.companySize) return null;
        return Object.assign(new CompanySizeSerialization(this.companySize, this.lang));
    }
}