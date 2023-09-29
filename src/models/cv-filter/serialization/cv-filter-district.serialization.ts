import { Language } from "src/common/enum";
import { DistrictSerializer } from "src/models/locations/districts/districts.serialization";
import { District } from "src/models/locations/districts/entities";

export class CVFilterDistrictSerializer {

    id!: string;
    full_name!: string;
    province_id!: string;

    constructor(district: District | null, lang: string) {
        this.id = district?.id || '';
        this.full_name = lang === Language.VI ? district?.name || '' : district?.fullNameEn || '';
        this.province_id = district?.provinceId || '';
    }

    static serialize(district: District | null, lang: string) {
        return new DistrictSerializer(district, lang);
    }
}