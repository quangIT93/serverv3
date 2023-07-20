import { Exclude, Expose, Transform } from "class-transformer";
import { Post } from "../entities";
import { categoryTranslator, locationTranslator } from "src/common/helper/translators";
import { Language, MoneyType } from "src/common/enum";
import { Ward } from "src/models/locations/wards/entities";
import { CompanySerialization } from "src/models/company-models/companies/serialization/company.serialization";
import { ChildCategory } from "src/models/categories/children/entities/child.entity";
import { jobTypeTranslator } from "src/common/helper/translators/jobType.translator";
import { JobType } from "src/models/job-types/entities/job-type.entity";
import { BUCKET_IMAGE_COMPANY_ICON, BUCKET_IMAGE_POST } from "src/common/constants";
import { PostImages } from "../../posts-images/entities/post-images.entity";
import { PostResource } from "../../post-resource/entities/post-resource.entity";
import { salaryTypeTranslator } from "src/common/helper/translators/salaryTypeTranslator";

export class PostDetailSeialization extends Post {
    lang: Language = Language.VI;

    constructor(post: Post, lang: Language) {
        super();
        this.lang = lang;
        Object.assign(this, post);
    }

    @Exclude()
    override latitude!: number;

    @Exclude()
    override longitude!: number;

    @Exclude({ toPlainOnly: true })
    override wardId!: string;

    @Exclude({ toPlainOnly: true })
    override ward!: Ward;

    @Exclude({ toPlainOnly: true })
    override categories: ChildCategory[] | undefined;

    @Exclude({ toPlainOnly: true })
    override postImages: PostImages[] | undefined;

    @Exclude({ toPlainOnly: true })
    override companyInformation: any;
    
    @Exclude({ toPlainOnly: true })
    override jobTypeData!: JobType;
    
    @Exclude({ toPlainOnly: true })
    override postResource!: PostResource;

    @Exclude({ toPlainOnly: true })
    override salaryType!: number;

    @Exclude({ toPlainOnly: true })
    override salaryTypeData!: any;

    @Transform(({ value }) => value ? +value : null)
    override startDate!: string | null;

    @Transform(({ value }) => value ? +value : null)
    override endDate!: string | null;

    @Transform(({ value }) => value ? +value : null)
    override startTime!: string;

    @Transform(({ value }) => value ? +value : null)
    override endTime!: string;    

    @Transform(({ value }) => new Date(value).getTime())
    override createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    override updatedAt!: Date;

    @Transform(({ value }) => new Date(value).getTime() || null)
    override expiredDate!: Date;

    @Transform(({ value }) => +value || null)
    override isInHouseData!: string;

    @Transform(({ value }) => +value || null)
    override moneyType!: string; 

    @Transform(({ value }) => +value || null)
    override isRemotely!: string;

    @Expose()
    get moneyTypeText() {
        if (!this.moneyType) return null;
        return this.moneyType === MoneyType.VND ? "VND": "USD";
    }
    
    @Expose()
    get postCategories() {
        if (!this.categories) return null;
        return this.categories.map((category) => categoryTranslator(category, this.lang));
    }

    @Expose()
    get location() {
        return locationTranslator(this.ward, this.lang);
    }

    @Expose()
    get postCompanyInformation() {
        if (!this.companyInformation) return null;
        return Object.assign(new CompanySerialization(this.companyInformation, this.lang));
    }

    @Expose()
    get postJobType() {
        if (!this.jobTypeData) return null;
        return jobTypeTranslator(this.jobTypeData, this.lang);
    }

    @Expose()
    get images() {
        if (!this.postImages) return null;
        if (this.postImages[0].type === 1) {
            this.postImages.shift();
        }
        return this.postImages.map((image) => {
            return {
                id: image.id,
                url: `${BUCKET_IMAGE_POST}/${this.id}/${image.image}`,
            }
        });
    }

    @Expose()
    get companyResourceData() {
        return {
            id: this.postResource.company,
            name: this.postResource.companyResource.name,
            logo: `${BUCKET_IMAGE_COMPANY_ICON}/${this.postResource.companyResource.logo}`,
        }
    }

    @Expose()
    get postSalaryType() {
        return salaryTypeTranslator(this.salaryTypeData, this.lang);
    }


    bookmarked: boolean = false;
}
