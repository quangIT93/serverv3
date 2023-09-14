import { Language } from "src/common/enum";
import { ProfilesJob } from "../entities/profiles-job.entity";
import { Exclude, Expose } from "class-transformer";
import { JobType } from "src/models/job-types/entities/job-type.entity";
import { JobTypesSerialization } from "src/models/job-types/serialization/job_types.serialization";

export class ProfilesJobsSerialization extends ProfilesJob {

    @Exclude({toPlainOnly: true})
    lang!: Language;

    constructor(profilesJob: ProfilesJob, lang : Language) {
        super();
        this.lang = lang;
        Object.assign(this, profilesJob);
    }

    @Exclude({toPlainOnly: true})
    override accountId!: string;

    @Exclude({toPlainOnly: true})
    override jobTypeId!: number;

    @Exclude({toPlainOnly: true})
    override jobType!: JobType;

    @Expose()
    get jobTypes() {
        return new JobTypesSerialization(this.jobType, this.lang)
    }
}