import { ChildCategory } from "src/models/categories/children/entities/child.entity";
import { JobType } from "src/models/job-types/entities/job-type.entity";
import { Ward } from "src/models/locations/wards/entities";
import { PostImages } from "src/models/post-models/posts-images/entities/post-images.entity";
import { SalaryType } from "src/models/salary-types/entities/salary-type.entity";
// import { PostCategories } from "src/models/posts-categories/entities/posts-categories.entity";
import { User } from "src/models/users/entities";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostResource } from "../../post-resource/entities/post-resource.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";


@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;
    
    @Column({ type: 'varchar', length: 50, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, name: 'title' })
    title!: string;

    @Column({ type: 'varchar', length: 255, name: 'company_name' })
    companyName!: string;

    @Column({ type: 'varchar', length: 255, name: 'address' })
    address!: string;

    @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'latitude' })
    latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'longitude' })
    longitude!: number;

    @Column({ type: 'varchar', length: 20, name: 'ward_id' })
    wardId!: string;

    @Column({ type: 'tinyint', default: 0, name: 'is_date_period' })
    isDatePeriod!: number;

    @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
    startDate!: string;

    @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
    endDate!: string;

    @Column({ type: 'varchar', length: 20, default: null, name: 'start_time' })
    startTime!: string;

    @Column({ type: 'varchar', length: 20, default: null, name: 'end_time' })
    endTime!: string;

    @Column({ type: 'tinyint', default: 0, name: 'is_working_weekend' })
    isWorkingWeekend!: number;

    @Column({ type: 'enum', enum:['0', '1'], default: '0', name: 'is_remotely' })
    isRemotely!: string;

    @Column({ type: 'double', default: 0, name: 'salary_min' })
    salaryMin!: number;

    @Column({ type: 'double', default: 0, name: 'salary_max' })
    salaryMax!: number;

    @Column({ type: 'int', default: 0, name: 'salary_type' })
    salaryType!: number;

    @Column({ type: 'enum', enum:['1', '2'], default: '1', name: 'money_type' })
    moneyType!: string;

    @Column({ type: 'varchar', length: 4000, default: null })
    description!: string;

    @Column({ type: 'varchar', length: 15, default: null, name: 'phone_contact' })
    phoneContact!: string;

    @Column({ type: 'varchar', length: 255, default: null, name: 'email' })
    email!: string;

    @Column({ type: 'enum', enum:['0', '1'], default: '0', name: 'is_inhouse_data' })
    isInHouseData!: string;

    @Column({ type: 'datetime', default: null, name: 'expired_date' })
    expiredDate!: Date;

    @Column({ type: 'tinyint', default: 0, name: 'job_type' })
    jobType!: number;

    @Column({ type: 'datetime', name: 'created_at', default: 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'datetime', name: 'updated_at', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @Column({ type: 'tinyint', default: 0, name: 'status' })
    status!: number;

    // Account relation
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'account_id' })
    account!: User;

    // Category relation
    @ManyToMany(() => ChildCategory, childCategory => childCategory.id)
    @JoinTable({
        name: 'posts_categories',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories: ChildCategory[] | undefined;

    //Ward relation
    @ManyToOne(() => Ward, ward => ward.posts)
    @JoinColumn({ name: 'ward_id' })
    ward!: Ward;
    

    @OneToMany(() => PostImages, postImages => postImages.post)
    @JoinColumn({ name: 'id' })
    postImages: PostImages[] | undefined;

    @ManyToOne(() => JobType, jobType => jobType.id)
    @JoinColumn({ name: 'job_type' })
    jobTypeData: JobType | undefined;

    @ManyToOne(() => SalaryType, salaryType => salaryType.id)
    @JoinColumn({ name: 'salary_type' })
    salaryTypeData: SalaryType | undefined;

    @OneToOne(() => PostResource, postResource => postResource.post)
    @JoinColumn({ name: 'id' })
    postResource: PostResource | undefined;

    @OneToMany(() => Bookmark, bookmark => bookmark.post)
    @JoinColumn({ name: 'id' })
    bookmarks: Bookmark[] | undefined;
    // companyResourceData: any;
}