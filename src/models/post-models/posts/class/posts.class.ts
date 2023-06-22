// import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


// @Entity('posts')
// export class Post extends BaseEntity {
//     @PrimaryGeneratedColumn('increment')
//     id!: number;
    
//     @Column({ type: 'varchar', length: 50, name: 'account_id' })
//     accountId!: string;

//     @Column({ type: 'varchar', length: 255, name: 'title' })
//     title!: string;

//     @Column({ type: 'varchar', length: 255, name: 'company_name' })
//     companyName!: string;

//     @Column({ type: 'varchar', length: 255, name: 'address' })
//     address!: string;

//     @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'latitude' })
//     latitude!: number;

//     @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'longitude' })
//     longitude!: number;

//     @Column({ type: 'varchar', length: 20, name: 'ward_id' })
//     wardId!: string;

//     @Column({ type: 'tinyint', default: 0, name: 'is_date_period' })
//     isDatePeriod!: number;

//     @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
//     startDate!: string;

//     @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
//     endDate!: string;

//     @Column({ type: 'varchar', length: 20, default: null, name: 'start_time' })
//     startTime!: string;

//     @Column({ type: 'varchar', length: 20, default: null, name: 'end_time' })
//     endTime!: string;

//     @Column({ type: 'tinyint', default: 0, name: 'is_working_weekend' })
//     isWorkingWeekend!: number;

//     @Column({ type: 'tinyint', default: 0, name: 'is_remotely' })
//     isRemotely!: number;

//     @Column({ type: 'double', default: 0, name: 'salary_min' })
//     salaryMin!: number;

//     @Column({ type: 'double', default: 0, name: 'salary_max' })
//     salaryMax!: number;

//     @Column({ type: 'int', default: 0, name: 'salary_type' })
//     salaryType!: number;

//     @Column({ type: 'tinyint', default: 1, name: 'money_type' })
//     moneyType!: number;

//     @Column({ type: 'varchar', length: 4000, default: null })
//     description!: string;

//     @Column({ type: 'varchar', length: 15, default: null, name: 'phone_contact' })
//     phoneContact!: string;

//     @Column({ type: 'varchar', length: 255, default: null, name: 'email' })
//     email!: string;

//     @Column({ type: 'tinyint', default: 0, name: 'is_inhouse_data' })
//     isInHouseData!: number;

//     @Column({ type: 'datetime', default: null, name: 'expired_date' })
//     expiredDate!: Date;

//     @Column({ type: 'tinyint', default: 0, name: 'job_type' })
//     jobType!: number;

//     @Column({ type: 'datetime', name: 'created_at', default: 'CURRENT_TIMESTAMP' })
//     createdAt!: Date;

//     @Column({ type: 'datetime', name: 'updated_at', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//     updatedAt!: Date;
// }