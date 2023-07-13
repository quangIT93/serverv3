import { Exclude, Expose, Transform } from 'class-transformer';
import { Profile } from "../entities";
import { BUCKET_CV, BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { categoryTranslator, genderTranslator, locationTranslator } from 'src/common/helper/translators';
import { Province } from 'src/models/locations/provinces/entities';
import { District } from 'src/models/locations/districts/entities';
import { Language } from 'src/common/enum';
import { CompanySerialization } from 'src/models/company-models/companies/serialization/company.serialization';

export class ProfileSerialization extends Profile {
    @Exclude({ toPlainOnly: true })
    lang: Language;

    constructor(profile: Profile, lang: Language) {
        super();
        this.lang = lang;
        Object.assign(this, profile);
    }
    
    // toPlainOnly: true => Exclude when transform to plain object

    // exclude address
    // return addressText
    @Exclude({ toPlainOnly: true }) 
    override address!: string;

    // exclude gender
    // return genderText
    // @Exclude({ toPlainOnly: true })
    // override gender!: number;

    // exclude cvUrl
    // return cvUrlPath
    @Exclude({ toPlainOnly: true })
    override cvUrl!: string;

    // exclude avatar
    // return avatarPath
    @Exclude({ toPlainOnly: true })
    override avatar!: string;
    
    // exclude province
    // return addressText
    @Exclude({ toPlainOnly: true })
    override province!: Province;

    //exclude profilesLocations
    @Exclude({ toPlainOnly: true })
    override profilesLocations!: District[];

    @Exclude({ toPlainOnly: true })
    override childCategories!: any[];

    // Transform createdAt to timestamp
    @Transform(({ value }) => new Date(value).getTime())
    override createdAt!: Date;

    // Transform updatedAt to timestamp
    @Transform(({ value }) => new Date(value).getTime())
    override updatedAt!: Date;
    
    @Exclude({ toPlainOnly: true })
    override company: any;

    // expose addressText
    @Expose()
    get addressText() {
        if (!this.address) return null;
        return locationTranslator(this.province, this.lang);
    }
    
    @Expose()
    get cvUrlPath() {
        if (!this.cvUrl) return null;
        return `${BUCKET_CV}/${this.accountId}/${this.cvUrl}`;
    }
    
    @Transform(({ value }) => +value)
    override birthday!: string;

    @Expose()
    get genderText() {
        if (!this.gender) return null;
        return genderTranslator(this.gender, this.lang);
    }

    @Expose()
    get avatarPath() {
        if (!this.avatar) return null;
        return `${BUCKET_IMAGE_AVATAR}/${this.avatar}`;
    }


    @Expose()
    get profileLocations() {
        if (!this.profilesLocations) return null;
        return this.profilesLocations.map(profileLocation => {
            console.log(profileLocation);
            return locationTranslator(profileLocation, this.lang);
        })
    }

    @Expose()
    get profileCategories() {
        if (!this.childCategories) return null;
        return this.childCategories.map(category => {
            return categoryTranslator(category, this.lang);
        })
    }

    @Expose()
    get companyInfomation() {
        if (!this.company) return null;
        return new CompanySerialization(this.company, this.lang);
    }

}