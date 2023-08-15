// import { MoneyType } from "src/common/enum";

import { CompanyResource } from 'src/models/company-resources/entities/company-resources.entity';
import { Post } from '../entities';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { Language, MoneyType } from 'src/common/enum';
import {
    BUCKET_IMAGE_COMPANY_ICON,
    BUCKET_IMAGE_POST,
} from 'src/common/constants';
import { jobTypeTranslator } from 'src/common/helper/translators/jobType.translator';
import { salaryTypeTranslator } from 'src/common/helper/translators/salaryTypeTranslator';

export class PostNormally {
    id!: number;
    title!: string;
    accountId!: string;
    companyName!: string;
    address!: string;
    salaryMin!: number;
    salaryMax!: number;
    thumbnail!: string;
    createdAtText!: string;
    moneyType!: string;
    image!: string | null;
    jobType!: any;
    salaryType!: any;

    location!: {
        ward: {
            id: string;
            fullName: string;
        };
        district: {
            id: string;
            fullName: string;
        };
        province: {
            id: string;
            fullName: string;
        };
    };

    companyResourceData!: CompanyResource;

    bookmarked: boolean = false;

    [key: string]: any;

    constructor(post: Post, lang: Language = Language.VI) {
        this.id = post.id;
        this.title = post.title;
        this.accountId = post.accountId;
        this.companyName = post.companyName;
        this.address = post.address;
        this.salaryMin = post.salaryMin;
        this.salaryMax = post.salaryMax;
        this.createdAtText = timeToTextTransform(post.createdAt, lang);
        this.moneyType = post.moneyType === MoneyType.VND ? 'VND' : 'USD';
        this.image =
            post.postImages && post.postImages.length > 0
                ? `${BUCKET_IMAGE_POST}/${post.id}/${post.postImages[0].image}`
                : post.categories
                    ? post.categories[0]?.parentCategory.image
                    : null;
        this.jobType = jobTypeTranslator(post.jobTypeData, lang);

        this.salaryType = salaryTypeTranslator(post.salaryTypeData, lang);

        this.location = {
            ward: {
                id: post.ward?.id,
                fullName:
                    lang === Language.VI ? post.ward?.fullName : post.ward?.fullNameEn,
            },
            district: {
                id: post.ward?.district?.id,
                fullName:
                    lang === Language.VI
                        ? post.ward?.district?.fullName
                        : post.ward?.district?.fullNameEn,
            },
            province: {
                id: post.ward?.district?.province?.id,
                fullName:
                    lang === Language.VI
                        ? post.ward?.district?.province?.fullName
                        : post.ward?.district?.province?.fullNameEn,
            },
        };

        this.companyResourceData = {
            ...post.postResource?.companyResource,
            logo: post.postResource?.companyResource?.logo
                ? `${BUCKET_IMAGE_COMPANY_ICON}/${post.postResource?.companyResource?.logo}`
                : `${BUCKET_IMAGE_COMPANY_ICON}/${post.companyResource?.logo}`,
        };
    }

    fromEntity(post: Post, lang: Language = Language.VI): PostNormally {
        return new PostNormally(post, lang);
    }
}
