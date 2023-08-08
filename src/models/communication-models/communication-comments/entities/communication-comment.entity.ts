import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('communication_comments')
export class CommunicationComment {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', nullable: false, name: 'communication_id' })
    communicationId!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'text', nullable: false, name: 'content' })
    content!: string;

    @Column({ type: 'int', nullable: false, name: 'parent_comment_id', default: 0 })
    parentCommentId!: number;

    @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
    status!: number;

    @Column({ type: 'date', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'date', nullable: false, name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    
    // sub comments
    @OneToMany(
        () => CommunicationComment,
        (communicationComment: CommunicationComment) => communicationComment.parentCommentId
    )
    subComments!: CommunicationComment[];

}
