import { Exclude, Expose, Transform } from 'class-transformer';
import { Profile } from "../entities";
import { BUCKET_CV, BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { categoryTranslator, genderTranslator, locationTranslator } from 'src/common/helper/translators';
import { Province } from 'src/models/locations/provinces/entities';
import { District } from 'src/models/locations/districts/entities';
import { Language } from 'src/common/enum';
import { ProfilesCv } from '../../profiles-cvs/entities/profiles_cv.entity';

export class ProfileInformationSerialization extends Profile {
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

    @Transform(({ value }) => value ? value : "Your name")
    override name!: string;

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

    // @Exclude({ toPlainOnly: true })
    // override profilesAward!: ProfilesAward[];

    // @Exclude({ toPlainOnly: true })
    // override profilesCourse!: ProfilesCourse[];

    // @Exclude({ toPlainOnly: true })
    // override profilesActivity!: ProfilesActivity[];

    // @Exclude({ toPlainOnly: true })
    // override profilesIntership!: ProfilesIntership[];

    // @Exclude({ toPlainOnly: true })
    // override profilesHobby!: ProfilesHobby;

    // @Exclude({ toPlainOnly: true })
    // override profilesReference!: ProfilesReference[];

    // @Exclude({ toPlainOnly: true })
    // override profilesSkill!: ProfilesSkill[];

    // @Exclude({ toPlainOnly: true })
    // override profileLanguage!: ProfileLanguage[];

    @Exclude({ toPlainOnly: true })
    override jobType!: any;

    @Exclude({ toPlainOnly: true })
    override user!: any;

    @Exclude({ toPlainOnly: true })
    override profilesCv!: ProfilesCv[]
    
    // @Exclude({ toPlainOnly: true })
    // override profilesEducation!: ProfilesEducation[];


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
        if (this.gender !== 0 && this.gender !== 1) return null;
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

    // @Expose()
    // get companyInfomation() {
    //     if (!this.company) return null;
    //     return new CompanySerialization(this.company, this.lang);
    // }

    // @Expose()
    // get profileAwards() {
    //     if (!this.profilesAward) return null;
    //     return this.profilesAward.map((profileAward: ProfilesAward) => {
    //         return new ProfilesAwardSerialization(profileAward, this.lang);
    //     })
    // }

    // @Expose()
    // get profileCourses() {
    //     if (!this.profilesCourse) return null;
    //     return this.profilesCourse.map((profileCourse: ProfilesCourse) => {
    //         return new ProfileCourseSerialization(profileCourse, this.lang);
    //     })
    // }

    // @Expose()
    // get profileActivities() {
    //     if (!this.profilesActivity) return null;
    //     return this.profilesActivity.map((profileActivity: ProfilesActivity) => {
    //         return new ProfilesActitvitesSerialization(profileActivity, this.lang);
    //     })
    // }

    // @Expose()
    // get profileInterships() {
    //     if (!this.profilesIntership) return null;
    //     return this.profilesIntership.map((profileIntership: ProfilesIntership) => {
    //         return new ProfilesIntershipSerialization(profileIntership, this.lang);
    //     })
    // }

    // @Expose()
    // get profileHobbies() {
    //     if (!this.profilesHobby) return null;
    //     return new ProfilesHobbiesSerializtion(this.profilesHobby, this.lang);
    // }

    // @Expose()
    // get profilesReferences() {
    //     if (!this.profilesReference) return null;
    //     return this.profilesReference.map((profileReference: ProfilesReference) => {
    //         return new ProfileReferenceSerialization(profileReference, this.lang);
    //     })
    // }

    // @Expose()
    // get profilesSkills() {
    //     if (!this.profilesSkill) return null;
    //     return this.profilesSkill.map((profileSkills: ProfilesSkill) => {
    //         return new ProfileSkillSerialization(profileSkills, this.lang);
    //     })
    // }

    // @Expose()
    // get profilesLanguages() {
    //     if (!this.profileLanguage) return null
    //     return this.profileLanguage.map((profileLanguages : ProfileLanguage) => {
    //         return new ProfileLanguageSerialization(profileLanguages, this.lang);
    //     })
    // }

    // @Expose()
    // get profilesJobType() {    
    //     if (!this.jobType) return null 
    //     return new JobTypesSerialization(this.jobType, this.lang);
    // }

    @Expose()
    get typeRoleData() {
        return this.user?.type ?? null;
    }

    // @Expose()
    // get profilesCvs() {
    //     if (!this.profilesCv) return null
    //     return this.profilesCv.map((profilesCv : ProfilesCv) => {
    //         return new ProfilesCvsSerialization(profilesCv, this.lang);
    //     })
    // }

    // @Expose()
    // get profilesEducations() {
    //     if (!this.profilesEducation) return null
    //     return this.profilesEducation.map((academic) => {
    //         return new ProfilesEducationSerialization(academic, this.lang);
    //     })
    // }
}