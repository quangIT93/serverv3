// import { CompanyResource } from "src/models/company-resources/entities/company-resources.entity";
// import { JobType } from "src/models/job-types/entities/job-type.entity";
import { Post } from "src/models/post-models/posts/entities";

export class Notification {

    id!: number;

    title?: string;

    content?: string;

    type!: number;

    status!: number;

    isRead!: boolean;

    postData?: Partial<Post>;

}
