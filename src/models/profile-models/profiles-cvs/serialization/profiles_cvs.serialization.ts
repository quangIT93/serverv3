import { Language } from "src/common/enum";
import { ProfilesCv } from "../entities/profiles_cv.entity";
import { Exclude, Expose } from "class-transformer";
import { BUCKET_CV } from "src/common/constants";


export class ProfilesCvsSerialization extends ProfilesCv {

    @Exclude()
    lang: Language;

    constructor(profilesCv: ProfilesCv, lang: Language) {
        super();
        Object.assign(this, profilesCv);
        this.lang = lang;
    }


    @Exclude({toPlainOnly: true})
    override accountId!: string;

    @Exclude({toPlainOnly: true})
    override image!: string;

    @Exclude({toPlainOnly: true})
    override path!:string;

    @Exclude({toPlainOnly: true})
    override createdAt!: Date;

    @Exclude({toPlainOnly: true})
    override updatedAt!: Date;

    @Expose()
    get imageURL() {
        return BUCKET_CV + "/" + this.accountId + "/" + this.id  + "/" + this.image;
    }

    @Expose()
    get pdfURL() {
        return BUCKET_CV + "/" + this.accountId + "/" + this.id  + "/" + this.path;
    }

}