// import { MoneyType } from "src/common/enum";

import { CompanyResource } from "src/models/company-resources/entities/company-resources.entity";
import { Post } from "../entities";
import { timeToTextTransform } from "src/common/helper/transform/timeToText.tranform";
import { MoneyType } from "src/common/enum";
import { BUCKET_IMAGE_COMPANY_ICON, BUCKET_IMAGE_POST } from "src/common/constants";

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
    moneyType!: string;
    image!: string | null;
    jobType!: {
        id: number;
        name: string;
    };
    salaryType!: {
        id: number;
        name: string;
    };

    location!: {
        ward: {
            id: string;
            fullName: string;
        },
        district: {
            id: string;
            fullName: string;
        },
        province: {
            id: string;
            fullName: string;
        },
    }

    companyResourceData!: CompanyResource;


    [key: string]: any;


    constructor(post: Post, lang = 'vi') {
        this.id = post.id;
        this.title = post.title;
        this.accountId = post.accountId;
        this.companyName = post.companyName;
        this.address = post.address;
        this.salaryMin = post.salaryMin;
        this.salaryMax = post.salaryMax;
        this.createdAtText = timeToTextTransform(post.createdAt, lang);
        this.moneyType = post.moneyType === MoneyType.VND ? 'VND' : 'USD';
        this.image = post.postImages && post.postImages.length > 0
            ? `${BUCKET_IMAGE_POST}/${post.id}/${post.postImages[0].image}`
            : post.categories
                ? post.categories[0]?.parentCategory.image
                : null;
        this.jobType = {
            id: post.jobTypeData?.id,
            name: 
                lang === 'vi' ? post.jobTypeData?.name :
                lang === 'en' ? post.jobTypeData?.nameEn : post.jobTypeData?.nameKo,
        }

        this.salaryType = {
            id: post.salaryTypeData?.id,
            name: 
                lang === 'vi' ? post.salaryTypeData?.value : 
                lang === 'en' ? post.salaryTypeData?.valueEn : post.salaryTypeData?.valueKo,
        }

        this.location = {
            ward: {
                id: post.ward?.id,
                fullName: lang === 'vi' ? post.ward?.fullName : post.ward?.fullNameEn,
            },
            district: {
                id: post.ward?.district?.id,
                fullName: lang === 'vi' ? post.ward?.district?.fullName : post.ward?.district?.fullNameEn,
            },
            province: {
                id: post.ward?.district?.province?.id,
                fullName: lang === 'vi' ? post.ward?.district?.province?.fullName : post.ward?.district?.province?.fullNameEn,
            },
        }

        this.companyResourceData = {
            ...post.postResource?.companyResource,
            logo: `${BUCKET_IMAGE_COMPANY_ICON}/${post.postResource?.companyResource?.logo}`
        }
    }

    fromEntity(post: Post, lang: string = 'vi'): PostNormally {
        return new PostNormally(post, lang);
    }
}