import { Exclude, Expose } from "class-transformer";
import { ProfilesEducation } from "../entities/profiles-education.entity";
import { Language } from "src/common/enum";
import { AcademicType } from "src/models/academic_types/entities/academic_type.entity";

export class ProfilesEducationSerialization extends ProfilesEducation {

    @Exclude({toPlainOnly: true})
    lang:Language
    
    constructor(profilesEducation: ProfilesEducation, lang: Language) {
        super();
        Object.assign(this, profilesEducation)
        this.lang = lang
    }

    @Exclude({toPlainOnly: true})
    override academicType!: AcademicType;

    @Expose()
    get academicTypeData() {
        switch (this.lang) {
            case Language.EN:
                return this.academicType?.valueEn;
            case Language.KO:
                return this.academicType?.valueKo;
            default:
                return this.academicType?.value;
        }
    }
}   